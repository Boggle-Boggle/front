# 로그인 플로우 FE 작업 플랜

## 문서 목적

이 문서는 OAuth 기반 로그인 플로우의 프론트엔드 작업 착수를 위해, 백엔드 LLD 분석 결과와 현재 프론트 코드베이스 구조를 연결해 초기 작업 범위와 설계 방향을 정리한다.

현 단계에서는 구현을 확정하지 않고 다음 두 가지를 기록한다.

- 백엔드 로그인 라이프사이클 LLD 기준 FE 계약
- 현재 프론트 코드베이스에서 실제 작업이 붙을 지점과 구조적 제약

## 참고 문서

- BE LLD: `back2/docs/lld/user-lifecycle.md`

## 1. 요구사항 분석

### 1.1 인증 방식

- 인증은 OAuth 전용이다.
- 지원 Provider는 `google`, `kakao`, `apple` 3종이다.
- 이메일/비밀번호 기반 회원가입 및 로그인은 제공하지 않는다.

### 1.2 로그인 진입

- FE는 `GET /v2/auth/oauth/{provider}/start?returnUrl=...` 로 사용자를 진입시킨다.
- provider 선택 이후 OAuth authorize URL 조립, state/nonce/PKCE 처리, provider redirect는 BE가 담당한다.

### 1.3 콜백 처리와 FE 분기

- Google, Kakao 콜백은 `GET /v2/auth/oauth/{provider}/callback` 이다.
- Apple 콜백은 `POST /v2/auth/oauth/apple/callback` 이다.
- FE는 provider 콜백을 직접 처리하지 않는다.
- BE는 FE 복귀 URL에 `status` 쿼리를 붙여 최종 분기한다.

분기 값:

- `EXISTING_USER`: 기존 사용자 로그인 완료
- `SIGNUP_REQUIRED`: 신규 사용자, 가입 미완료

### 1.4 쿠키 기반 인증

- 인증은 HttpOnly 쿠키 기반이다.
- 주요 쿠키는 다음과 같다.
  - `bbgk_at`: Access Token
  - `bbgk_rt`: Refresh Token
  - `bbgk_signup_ticket`: 가입 임시 상태
- FE는 토큰 값을 직접 저장하거나 읽는 구조를 전제로 하면 안 된다.
- 로그인 여부는 쿠키 존재 추정이 아니라 사용자 정보 조회 성공/실패로 판단하는 쪽이 맞다.

### 1.5 신규 가입 플로우

- OAuth 콜백 결과가 `SIGNUP_REQUIRED` 이면 `bbgk_signup_ticket` 쿠키가 설정된다.
- FE는 가입 화면으로 이동해 약관 조회, 닉네임 검증, 가입 완료 제출을 진행해야 한다.
- 가입 완료 API는 `POST /v2/auth/signup/complete` 이다.
- 성공 시 `bbgk_signup_ticket` 쿠키는 제거되고 로그인 쿠키가 발급된다.

가입 화면에서 필요한 보조 API:

- `GET /v2/terms/latest`
- `GET /v2/users/nickname/availability`

### 1.6 로그인 이후 및 예외 처리

- 기존 사용자 로그인 완료 시 FE는 앱 진입 후 `/users/me` 계열 사용자 조회로 세션 유효성을 확정해야 한다.
- 재발급 실패 `401 AUTH_REFRESH_INVALID` 시 로그인 화면 복귀가 필요하다.
- `AUTH_TOKEN_MISSING`, `AUTH_TOKEN_INVALID` 는 재시도 없이 로그인 화면 복귀 정책이 필요하다.

## 2. 현재 프론트 구조 파악

### 2.1 라우트 구조

현재 라우트는 `src/router.tsx` 에 정의되어 있다.

공개 라우트:

- `/login`
- `/signup`
- `/signup/terms/:termId`

보호 라우트:

- `/`
- `/search`
- `/library`
- 기타 서비스 화면

다만 현재 `PrivateRoute` 는 보호 기능이 사실상 비활성화된 상태다.

### 2.2 현재 로그인 페이지 상태

`src/pages/Login/index.tsx`

- provider 버튼 UI는 존재한다.
- 실제 OAuth 시작 API 호출은 없다.
- 클릭 시 임시로 `/` 로 이동한다.
- 즉 현재 구현은 시각 목업 단계에 가깝다.

### 2.3 현재 회원가입 페이지 상태

`src/pages/SignUp/index.tsx`

- 닉네임 입력
- 약관 동의
- 완료 스텝

위 3단계 UI는 있으나 실제 API 연동은 없다.

또한 현재 구조는 `signup_ticket` 존재를 전제로 한 가입 완료 플로우와 직접 연결되어 있지 않다.

### 2.4 현재 인증 상태 관리

`src/stores/useAuthStore.ts`

- Zustand persist 기반
- `accessToken` 문자열 저장
- `isAuthenticated` 플래그 저장

이 구조는 백엔드 LLD의 HttpOnly 쿠키 기반 인증 모델과 맞지 않는다.

### 2.5 PrivateRoute 상태

`src/pages/PrivateRoute.tsx`

- 현재 구현은 `return <Outlet />;` 으로 고정되어 있다.
- 인증 여부에 따른 접근 제어가 실제로 동작하지 않는다.

### 2.6 API 클라이언트 상태

`src/services/index.ts`

- `axios` 인스턴스에 `withCredentials: true` 가 이미 적용되어 있다.
- 쿠키 기반 인증 연동에는 유리하다.
- 다만 request interceptor 가 Zustand 의 `accessToken` 을 `Authorization` 헤더로 주입하고 있다.
- 새 로그인 플로우에서는 이 부분이 충돌 가능성이 있다.

### 2.7 기존 서비스 레이어 상태

`src/services/legacy/user.ts`

- `/auth/refresh`
- `/auth/signup`
- `/user/nickname`
- `/terms`

등의 구버전 계약을 기준으로 작성되어 있다.

참고는 가능하지만, 새 OAuth 플로우 API 계약에 그대로 재사용하기는 어렵다.

### 2.8 작업 시 제약

- `src/pages/legacy/**`, `legacy/**` 는 수정 금지 영역이다.
- 새 로그인 플로우는 레거시를 건드리지 않고 새 페이지/훅/API 레이어에서 붙여야 한다.

## 3. 현재 시점의 FE 작업 방향

현재 분석 기준으로 필요한 작업 축은 다음과 같다.

- `/login` 을 실제 OAuth 시작 진입 화면으로 전환
- 인증 복귀 처리용 라우트 추가
- `/signup` 을 `signup_ticket` 전제의 실제 가입 완료 플로우로 재구성
- 약관 조회, 닉네임 가용성 검사, 가입 완료 제출용 API 훅 추가
- 인증 상태 판단 기준을 토큰 저장이 아니라 사용자 조회 성공 여부로 전환
- `PrivateRoute` 와 공통 인증 실패 처리 정책 재설계

## 4. 다음 단계 후보

다음 단계에서는 아래를 구체화해야 한다.

- 라우트 설계
- 화면 흐름 설계
- API hook 설계
- 인증 상태 동기화 전략
- 작업 단위 세분화
