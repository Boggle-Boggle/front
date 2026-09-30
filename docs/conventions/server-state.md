# 서버 상태 컨벤션

## 기본 원칙

컴포넌트 파일에서 `useQuery`, `useInfiniteQuery`를 직접 선언하지 않는다.

Query는 페이지 또는 섹션 전용 custom hook으로 분리한다.

```txt
BookDetail/
  queries/
    useBookDetailQuery.ts
    useBookReviewsInfiniteQuery.ts
```

## API 파일

API 호출 함수는 사용처와 가까운 `api.ts`에 둔다.

```txt
BookDetail/
  api.ts
```

`api.ts`는 아래만 담당한다.

- API request/response 타입
- axios 호출 함수
- 응답 DTO에서 필요한 data 반환

`api.ts`는 로딩, 에러 UI, 토스트, 라우팅, Query option을 담당하지 않는다.

## Query hook

Query hook은 `queries/` 아래에 둔다.

파일명과 함수명은 아래 형식을 따른다.

```txt
use{Domain}{Resource}Query.ts
use{Domain}{Resource}InfiniteQuery.ts
```

예시:

```txt
queries/
  useBookDetailQuery.ts
  useBookReviewsInfiniteQuery.ts
  useReadingLogDetailQuery.ts
```

Query hook은 아래를 담당한다.

- `queryKey`
- `queryFn`
- `enabled`
- `retry`
- `staleTime`
- `throwOnError`
- `select`
- infinite query의 `initialPageParam`, `getNextPageParam`

예시:

```tsx
export const useBookDetailQuery = (isbn13: string) => {
  return useQuery({
    queryKey: ['books', 'detail', isbn13],
    queryFn: () => getBookDetail(isbn13),
    enabled: Boolean(isbn13),
  });
};
```

## Query 반환값 사용

페이지 컴포넌트에서 query 반환값은 반드시 화면 맥락에 맞게 alias 한다.

좋은 예:

```tsx
const {
  data: bookDetail,
  error: bookDetailError,
  isLoading: isBookDetailLoading,
  isError: isBookDetailError,
} = useBookDetailQuery(isbn13);
```

나쁜 예:

```tsx
const { data, error, isLoading, isError } = useBookDetailQuery(isbn13);
```

query가 하나뿐인 페이지에서도 alias 한다.

## 서버 상태 hook 배치

컴포넌트 내부에서 서버 상태 관련 hook은 한 묶음으로 둔다.

순서는 아래를 따른다.

1. `useQueryClient`
2. Query hooks
3. Mutation hooks

이 그룹 내부에는 빈 줄을 두지 않는다.

```tsx
const queryClient = useQueryClient();
const {
  data: bookDetail,
  error: bookDetailError,
  isLoading: isBookDetailLoading,
  isError: isBookDetailError,
} = useBookDetailQuery(isbn13);
const { mutate: toggleWishlist, isPending: isToggleWishlistPending } = useToggleWishlistMutation();
```

## Mutation

Mutation도 화면 정책이 포함되면 custom hook으로 분리한다.

분리 기준:

- toast 처리
- invalidate 처리
- optimistic update
- navigate 처리
- 에러 코드 분기
- 같은 mutation을 여러 곳에서 재사용

파일명과 함수명은 아래 형식을 따른다.

```txt
use{Action}{Resource}Mutation.ts
```

예시:

```txt
useChangeNicknameMutation.ts
useDeleteReadingLogMutation.ts
```

Mutation 반환값도 반드시 alias 한다.

```tsx
const { mutate: changeNickname, isPending: isChangeNicknamePending } = useChangeNicknameMutation();
```

