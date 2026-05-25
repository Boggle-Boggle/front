# Auth 연동 FE 구현 플랜

## 문서 목적

이 문서는 빼곡 v2 프론트엔드에서 OAuth 로그인, 신규 가입, 세션 복구, 로그아웃을 실제로 붙이기 위한 구현 계획을 정리한다.

프론트엔드의 인증 플로우는 백엔드 LLD를 SSOT로 삼고, 현재 코드베이스 구조에 맞게 책임과 작업 순서를 구체화하는 데 목적이 있다.

## 참고 문서

- BE LLD: `back2/docs/lld/user-lifecycle.md`
- 프로젝트 구조 컨벤션: `docs/convention/project-structure.md`
- 상태 관리 컨벤션: `docs/convention/state-management.md`

## 1. SSOT 기준

### 1.1 인증 방식

- 인증은 OAuth 전용이다.
- 지원 provider 는 `google`, `kakao`, `apple` 3종이다.
- 인증 정보는 HttpOnly 쿠키로만 전달된다.
- FE는 access token, refresh token, signup ticket 값을 직접 읽거나 저장하지 않는다.

### 1.2 로그인 시작

- FE는 `GET /v2/auth/oauth/{provider}/start?returnUrl=...` 로 사용자를 진입시킨다.
- OAuth authorize URL 조립, state/PKCE, provider redirect 는 BE가 담당한다.
- `returnUrl` 은 OAuth 완료 후 FE가 다시 돌아올 앱 URL이며, 1차 구현에서는 `/auth` 를 사용한다.

### 1.3 콜백 처리

- FE는 provider callback API를 직접 호출하지 않는다.
- Google, Kakao 는 `GET /v2/auth/oauth/{provider}/callback`
- Apple 은 `POST /v2/auth/oauth/apple/callback`
- provider 가 BE callback 으로 들어오면, BE가 최종적으로 `returnUrl?status=...` 로 FE를 redirect 한다.

### 1.4 콜백 결과 분기

- `EXISTING_USER`: 기존 사용자 로그인 완료
- `SIGNUP_REQUIRED`: 신규 사용자, 가입 미완료
- `ERROR`: 인증 실패

FE는 복귀 URL의 `status` query param 을 기준으로 다음처럼 분기한다.

- `EXISTING_USER`: `/auth` 에서 서비스 화면으로 이동
- `SIGNUP_REQUIRED`: `/auth` 에서 `/signup` 으로 이동
- `ERROR`: 에러 코드 기반 안내 후 `/login` 유지

### 1.5 가입 플로우

- 신규 사용자는 callback 시점에 `bbgk_signup_ticket` 쿠키가 발급된다.
- FE는 `/signup` 화면에서 다음 API를 사용한다.
  - `GET /v2/terms/latest`
  - `GET /v2/users/nickname/availability`
  - `POST /v2/auth/signup/complete`
- 가입 완료 성공 시 signup ticket 은 제거되고 로그인 쿠키가 발급된다.

### 1.6 세션 복구와 만료 처리

- 앱 초기 진입 시 `GET /v2/users/me` 로 로그인 여부를 확인한다.
- `AT 쿠키가 필요한 인증 대상 API` 가 `401 AUTH_TOKEN_EXPIRED` 를 반환하면 `POST /v2/auth/refresh` 후 원 요청을 1회 재시도한다.
- refresh 실패 시 인증 상태를 비로그인으로 전환하고 `/login` 으로 보낸다.

## 2. FE 책임 범위

프론트엔드는 다음 책임만 가진다.

- OAuth 시작 URL로 진입시키기
- callback 복귀 후 `status` 분기 처리
- signup 화면에서 약관 조회, 닉네임 검증, 가입 완료 제출
- 앱 부팅 시 세션 확인
- 인증 필요한 라우트 보호
- 토큰 만료 시 refresh 후 재시도
- 로그아웃 시 로컬 인증 상태 초기화

프론트엔드가 하지 않는 일은 다음과 같다.

- token 쿠키 값 읽기
- provider callback 직접 호출
- provider state/PKCE 관리
- device id 생성 및 저장

## 3. 현재 코드베이스 적용 원칙

### 3.1 레거시 분리

- `src/legacy/**`, `legacy/**` 는 수정하지 않는다.
- 구 인증 흐름은 참고만 하고, 신규 구조에서 별도로 구현한다.

### 3.2 인증 상태 기준

- 기존 `useAuthStore` 의 `accessToken` 저장 방식은 신규 auth 기준으로 사용하지 않는다.
- 새 인증 상태는 "토큰 보관 여부"가 아니라 "세션 확인 결과"를 기준으로 관리한다.
- 1차 구현에서는 별도 auth store 를 두기보다 `GET /v2/users/me` 결과를 auth 상태의 기준으로 사용한다.

권장 기준:

- 사용자 정보의 SSOT 는 `useMeQuery` 다.
- 로그인 여부는 `useMeQuery` 의 `data`, `error`, `isLoading` 으로 판단한다.
- 전역 auth store 는 필수가 아니다.
- 토큰, 사용자 정보, 인증 플래그를 Query cache 와 별도로 중복 저장하지 않는다.

### 3.3 서버 상태 관리

- `users/me`, `terms/latest`, `nickname/availability` 는 TanStack Query 기반으로 관리한다.
- `signup/complete`, `refresh`, `logout` 은 mutation 또는 API 유틸로 분리한다.

## 4. 목표 사용자 흐름

### 4.1 기존 사용자 로그인

1. `/login` 에서 provider 버튼 클릭
2. FE가 브라우저를 `GET /v2/auth/oauth/{provider}/start?returnUrl={FE_BASE_URL}/auth` 로 이동시킨다
3. OAuth 완료 후 BE가 `/auth?status=EXISTING_USER` 로 redirect
4. FE `/auth` 라우트가 앱에 진입한다
5. `GET /v2/users/me` 성공
6. `useMeQuery` 성공 결과를 로그인 상태로 해석하고 서비스 화면으로 이동한다

### 4.2 신규 사용자 가입

1. `/login` 에서 provider 버튼 클릭
2. FE가 브라우저를 `GET /v2/auth/oauth/{provider}/start?returnUrl={FE_BASE_URL}/auth` 로 이동시킨다
3. OAuth 완료 후 BE가 `/auth?status=SIGNUP_REQUIRED` 로 redirect
4. FE `/auth` 라우트가 `status` 를 읽고 `/signup` 으로 이동시킨다
5. `GET /v2/terms/latest` 조회
6. 닉네임 입력 후 `GET /v2/users/nickname/availability`
7. `POST /v2/auth/signup/complete`
8. `GET /v2/users/me` 성공
9. `useMeQuery` 성공 결과를 기준으로 서비스 화면에 진입한다

### 4.3 앱 재진입

1. 앱 부팅
2. `GET /v2/users/me`
3. 성공 시 서비스 유지
4. 실패 시 `/login`

### 4.4 토큰 만료

1. 인증 대상 API 호출
2. `401 AUTH_TOKEN_EXPIRED`
3. `POST /v2/auth/refresh`
4. 성공 시 원 요청 1회 재시도
5. 실패 시 `/login`

## 5. 구현 항목

### 5.1 라우트

필수 라우트 작업:

- `/login`: 실제 OAuth 시작 페이지로 연결
- `/auth`: OAuth 완료 후 BE가 redirect 해주는 FE 복귀 라우트
- `/signup`: signup ticket 전제의 가입 완료 페이지로 유지

이 라우트의 역할:

- `status` query param 읽기
- `EXISTING_USER` 면 홈 또는 원래 경로로 이동
- `SIGNUP_REQUIRED` 면 `/signup` 이동
- `ERROR` 면 `/login` 이동

주의:

- `/v2/auth/oauth/{provider}/start` 는 FE 라우트가 아니라 BE 엔드포인트다.
- 실제 provider callback 엔드포인트와 FE callback 라우트는 다르다.
- FE `/auth` 라우트는 BE가 redirect 해주는 최종 landing page 다.

### 5.2 API 계층

권장 구조:

- `src/services/auth`
- `src/services/users`
- `src/services/terms`

예상 함수:

- `startOAuthLogin(provider, returnUrl)` 또는 URL builder
- `refreshSession()`
- `logout()`
- `completeSignup(payload)`
- `getMe()`
- `getNicknameAvailability(nickname)`
- `getLatestTerms()`

현재 `src/services/index.ts` 의 `withCredentials: true` 는 유지 가능하다.

다만 다음은 정리 대상이다.

- request interceptor 의 `Authorization` 헤더 주입 제거
- 기존 accessToken 의존 응답 처리 제거

### 5.3 Query / Mutation Hook

권장 hook:

- `useMeQuery`
- `useLatestTermsQuery`
- `useNicknameAvailabilityQuery` 또는 debounce 포함 custom hook
- `useCompleteSignupMutation`
- `useLogoutMutation`

refresh 는 전역 interceptor 또는 공통 API wrapper 에 두는 편이 적합하다.

### 5.4 Auth 상태 관리

1차 구현 권장안:

- 별도 auth store 없이 `useMeQuery` 를 기준으로 인증 상태를 해석한다.
- `me` 데이터는 Query cache 를 SSOT 로 사용한다.
- 로그아웃 후에는 관련 query 를 invalidate 또는 remove 한다.

인증 상태 해석 예시:

- `isLoading`: 세션 확인 중
- `data` 존재: 로그인 상태
- 인증 실패 error: 비로그인 상태

보조 store 검토는 다음 경우에만 한다.

- refresh 실패 후 1회성 에러 상태를 전역으로 공유해야 하는 경우
- 인증 만료 모달이나 토스트를 화면 간 공통으로 제어해야 하는 경우

비권장:

- access token 문자열 저장
- localStorage 에 토큰 persist
- `me` 데이터를 Query 와 store 양쪽에 중복 저장

### 5.5 Route Guard

`PrivateRoute` 는 다음 조건으로 동작해야 한다.

- `useMeQuery` 로 세션 상태를 확인한다.
- `isLoading`: 로딩 화면
- `data` 존재: 자식 라우트 렌더
- 인증 실패 error: `/login` 이동

초기 렌더에서 세션 확인이 끝나기 전까지는 바로 redirect 하지 않도록 설계해야 한다.

### 5.6 Signup 화면

`/signup` 에서 필요한 변경:

- 진입 조건을 `status=SIGNUP_REQUIRED` 기반 흐름에 맞추기
- 약관 데이터를 상수 대신 `GET /v2/terms/latest` 결과로 렌더링
- 닉네임 검증을 서버 계약과 연결
- 제출 시 `POST /v2/auth/signup/complete`

닉네임 검증 원칙:

- FE는 기본 길이/빈값/허용 문자 정도만 즉시 검증
- 최종 판정은 서버 응답 코드 기준으로 처리
- `USER_NICKNAME_INVALID`, `USER_NICKNAME_DUPLICATED` 대응 메시지 필요

### 5.7 로그인 페이지

`/login` 에서 필요한 변경:

- provider 버튼 클릭 시 `/signup` 이동 제거
- provider 별 start URL 생성
- 에러 복귀 시 query 기반 안내 처리

### 5.8 로그아웃

로그아웃 시나리오:

1. `POST /v2/auth/logout`
2. 성공/실패와 무관하게 관련 auth query cache 정리
3. `/login` 이동

## 6. 구현 순서

### 1단계. 공통 인증 골격

- `getMe`, `refresh`, `logout` API 추가
- `useMeQuery` 추가
- 앱 부팅 시 세션 확인 로직 추가
- `PrivateRoute` 정상화

### 2단계. 로그인 시작과 복귀 처리

- `/login` 에서 provider start 연동
- `/auth` 라우트 추가
- `status` 분기 처리

### 3단계. signup API 연동

- `/v2/terms/latest` 연결
- 닉네임 availability 연결
- `/v2/auth/signup/complete` 연결
- 성공 후 `me` 재조회 및 서비스 진입

### 4단계. 인증 실패 공통 처리

- `AUTH_TOKEN_EXPIRED` refresh 재시도
- refresh 실패 시 `/login`
- `AUTH_TOKEN_MISSING`, `AUTH_TOKEN_INVALID` 공통 처리

### 5단계. 예외 UX 정리

- `ERROR` 복귀 시 메시지 처리
- 가입 중 ticket 만료 시 재로그인 유도
- nickname/terms API 실패 UX 정리

## 7. 작업 전 확인 항목

다음 값은 구현 전에 FE 환경변수 또는 앱 합의가 필요하다.

- OAuth 완료 후 돌아올 `returnUrl`
- 로그인 성공 후 기본 진입 경로
- `status=ERROR` 시 노출할 사용자 메시지 매핑
- 웹뷰 내 뒤로가기 처리 정책

## 8. 문서 기준 결론

이 작업의 핵심은 "토큰 저장형 로그인"을 붙이는 것이 아니라, "BE redirect + HttpOnly 쿠키 + `/users/me` 기반 세션 확인" 구조를 FE에 심는 것이다.

따라서 구현의 시작점은 로그인 버튼이 아니라 다음 세 가지다.

- 인증 상태 모델 재정의
- 앱 부팅 시 세션 bootstrap
- callback 복귀 후 status 분기 라우팅
