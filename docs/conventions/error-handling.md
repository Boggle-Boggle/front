# 에러 처리 컨벤션

## 처리 책임

에러 처리 책임은 아래 기준으로 나눈다.

- 라우터 없음: React Router의 `path: '*'`와 `NotFound`에서 처리한다.
- 인증 실패: `PrivateRoute`에서 로그인 흐름으로 처리한다.
- 공통 실패: `RouteErrorFallback`에서 처리한다.
- 리소스 없음: 각 페이지에서 화면 맥락에 맞게 처리한다.
- 비즈니스 에러: 해당 mutation/query 사용처 가까이에서 처리한다.

## 공통 실패

공통 실패는 전역 정책으로 관리한다.

공통 실패 예시:

- `CLIENT_REQUEST_FAILED`
- `COMMON_INTERNAL_ERROR`
- `AUTH_FORBIDDEN`

공통 실패로 분류한 query 에러만 `throwOnError`를 통해 `RouteErrorFallback`으로 전달한다.

## 인증 실패

인증 실패는 `PrivateRoute`에서 처리한다.

인증 실패 예시:

- `AUTH_TOKEN_MISSING`
- `AUTH_TOKEN_EXPIRED`
- `AUTH_TOKEN_INVALID`
- `AUTH_REFRESH_INVALID`

인증 실패는 공통 에러 화면으로 보내지 않고 로그인 흐름으로 보낸다.

## 리소스 없음

리소스 없음은 전역 에러 정책에 넣지 않는다.

각 페이지가 화면 맥락에 맞게 처리한다.

예시:

```tsx
if (isApiError(error) && error.code === 'BOOK_NOT_FOUND') {
  return <BookDetailFallback variant="notFound" />;
}
```

리소스 없음 예시:

- `BOOK_NOT_FOUND`
- `READING_LOG_NOT_FOUND`
- `READING_NOTE_NOT_FOUND`
- `REVIEW_NOT_FOUND`
- `TERMS_NOT_FOUND`

## Loading UI 선택 기준

로딩 UI는 화면 맥락에 따라 선택한다.

### Fullscreen Loading

페이지 진입 자체를 막는 상태에서 사용한다.

예시:

- 인증 확인
- 라우트 보호 여부 확인
- 화면 골격을 아직 보여줄 수 없는 초기 진입

### Skeleton

페이지 구조는 유지하면서 데이터 영역만 기다릴 수 있을 때 사용한다.

예시:

- 상세 페이지 본문
- 리스트 첫 로딩
- 카드형 콘텐츠

### Partial Loading

특정 섹션이나 액션만 로딩 중일 때 사용한다.

예시:

- 버튼 pending
- infinite query 다음 페이지 로딩
- 특정 섹션 재조회

## 페이지 핵심 query 상태 처리

페이지 핵심 query의 loading, error, resource not found 상태는 컴포넌트 상단에서 early return으로 처리한다.

```tsx
if (isBookDetailLoading) return <BookDetailSkeleton />;

if (isBookDetailError || !bookDetail) {
  return <BookDetailFallback error={bookDetailError} />;
}
```

정상 JSX 내부에서 페이지 핵심 query의 error 분기를 반복하지 않는다.

## 보조 query 상태 처리

보조 query는 해당 섹션 내부에서 fallback을 처리할 수 있다.

```tsx
<ReviewSection>
  {isReviewError ? <ReviewFallback /> : <ReviewList />}
</ReviewSection>
```

빈 결과와 요청 실패는 구분한다.

- 빈 결과: empty state
- 요청 실패: section fallback 또는 재시도 UI

