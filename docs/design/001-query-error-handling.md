# Query 에러 핸들링 설계 및 정비 계획

## 문서 목적

이 문서는 서버 상태를 사용하는 페이지에서 로딩, 에러, 리소스 없음 상태를 일관되게 정리하기 위한 설계 방향과 실행 계획을 정의한다.

이 문서는 현재 코드베이스를 정비하기 위한 설계 및 체크리스트다. 정비가 끝난 뒤 반복 적용할 기준은 `docs/conventions/server-state.md`, `docs/conventions/component-structure.md`, `docs/conventions/error-handling.md`에 반영할 수 있다.

## 기본 방향

에러 처리 책임은 아래 기준으로 나눈다.

- 라우터 없음: React Router의 `path: '*'`와 `NotFound`에서 처리한다.
- 인증 실패: `PrivateRoute`에서 로그인 흐름으로 처리한다.
- 공통 실패: `RouteErrorFallback`에서 처리한다.
- 리소스 없음: 각 페이지에서 화면 맥락에 맞게 처리한다.
- 비즈니스 에러: 해당 mutation/query 사용처 가까이에서 처리한다.

## 정비 원칙

### Query 선언 위치를 먼저 정리한다

query 선언 방식은 에러 처리 정비 전에 먼저 통일한다.

현재 검토 중인 방향은 페이지 컴포넌트에서 `useQuery`, `useInfiniteQuery`를 직접 선언하지 않고, 페이지/섹션 전용 custom hook으로 분리하는 것이다.

이 방향을 확정하기 전에 아래 기준을 먼저 정한다.

- 페이지 폴더 기본 구조
- query hook 파일 위치
- query hook 이름 규칙
- `api.ts`와 query hook의 책임 경계
- `index.tsx`가 담당할 UI 상태 분기 범위

### 페이지 핵심 query와 보조 query를 구분한다

페이지 핵심 query는 실패하면 페이지 자체가 성립하지 않는 요청이다.

예시:

- 도서 상세의 도서 정보
- 독서기록 상세의 기록 정보
- 마이페이지의 사용자 프로필

보조 query는 실패해도 페이지의 주요 화면을 유지할 수 있는 요청이다.

예시:

- 상세 페이지 안의 리뷰 목록
- 추천 도서 섹션
- 최근 검색어 목록
- 일부 설정/부가 정보 목록

### 상태 분기는 JSX 본문에 섞지 않는다

페이지 핵심 query의 로딩, 에러, 리소스 없음 분기는 컴포넌트 상단에서 early return으로 처리한다.

정상 렌더 JSX는 가능한 한 data가 존재한다는 전제로 작성한다.

```tsx
if (isLoading) return <Loading fullscreen />;

if (isError || !data) {
  return <PageFallback error={error} />;
}

return <PageContent data={data} />;
```

보조 query의 실패는 해당 섹션 내부 fallback으로 처리할 수 있다.

```tsx
<section>
  {isReviewError ? <ReviewFallback /> : <ReviewList />}
</section>
```

### 리소스 없음은 페이지 맥락에 맞춘다

리소스 없음은 전역 에러 정책에 넣지 않는다.

각 페이지에서 `isApiError(error)`와 서버 에러 코드를 사용해 직접 분기한다.

예시:

```tsx
if (isApiError(error) && error.code === 'BOOK_NOT_FOUND') {
  return <BookDetailNotFound />;
}
```

## 실행 체크리스트

### 1. 현재 query 사용 현황 파악

- [ ] 라우트 페이지가 폴더 구조(`PageName/index.tsx`)인지 단일 파일(`PageName.tsx`)인지 목록화한다.
- [ ] 각 페이지 폴더에 `api.ts`가 있는지 확인한다.
- [ ] `useQuery`, `useInfiniteQuery` 사용처를 목록화한다.
- [ ] custom hook으로 감싸진 query와 inline query를 구분한다.
- [ ] custom hook 파일 위치와 이름 패턴을 목록화한다.
- [ ] 각 query를 페이지 핵심 query와 보조 query로 분류한다.
- [ ] `throwOnError` 사용처를 확인한다.
- [ ] 우선 정비할 페이지 후보를 정한다.

### 2. Query 선언 규칙 정리

- [ ] inline query를 유지할 페이지를 정한다.
- [ ] custom hook으로 분리할 query를 정한다.
- [ ] custom hook 이름은 페이지/도메인 맥락이 드러나게 정한다.
- [ ] query option이 페이지마다 흩어져 있으면 한 위치로 모은다.

### 3. 공통 실패 처리 확인

- [ ] `policy/error.ts`의 공통 실패 코드가 아래 범위만 포함하는지 확인한다.
  - `CLIENT_REQUEST_FAILED`
  - `COMMON_INTERNAL_ERROR`
  - `AUTH_FORBIDDEN`
- [ ] 인증 실패 코드는 `PrivateRoute`에서 처리되는지 확인한다.
- [ ] 리소스 없음 코드는 전역 route error에 포함하지 않는다.

### 4. 페이지 핵심 query 상태 분기 정리

- [ ] 핵심 query는 컴포넌트 상단에서 loading 상태를 먼저 처리한다.
- [ ] 핵심 query의 error/data 없음 상태를 정상 JSX 전에 처리한다.
- [ ] 정상 JSX 내부에서 핵심 query error 분기를 반복하지 않는다.
- [ ] 에러 상태에서는 불가능한 액션 버튼을 노출하지 않는다.

### 5. 리소스 없음 처리 추가

- [ ] `BOOK_NOT_FOUND`를 도서 상세 페이지에서 처리한다.
- [ ] `READING_LOG_NOT_FOUND`를 독서기록 상세 페이지에서 처리한다.
- [ ] `READING_NOTE_NOT_FOUND`를 노트 상세/편집 페이지에서 처리할지 검토한다.
- [ ] `TERMS_NOT_FOUND`는 서버 약관 상세 query가 생길 때 처리한다.
- [ ] 리소스 없음 메시지는 페이지 맥락에 맞게 작성한다.

### 6. 보조 query fallback 정리

- [ ] 목록/섹션 query는 전체 페이지를 막지 않는 방향으로 처리한다.
- [ ] 빈 결과와 요청 실패를 구분한다.
- [ ] 빈 결과는 empty state로, 요청 실패는 섹션 fallback 또는 재시도 UI로 처리한다.

### 7. 검증

- [ ] `pnpm exec tsc -b`를 실행한다.
- [ ] 라우터 없음 URL에서 `NotFound`가 표시되는지 확인한다.
- [ ] 인증 없는 보호 라우트 진입 시 `/login`으로 이동하는지 확인한다.
- [ ] 공통 실패가 `RouteErrorFallback`으로 표시되는지 확인한다.
- [ ] 리소스 없음이 각 페이지 fallback으로 표시되는지 확인한다.
