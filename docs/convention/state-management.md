# 상태 관리 컨벤션

## 문서 목적

이 문서는 빼곡 프론트엔드에서 서버 상태를 Query와 Mutation 기준으로 어떻게 관리할지 정의한다.

데이터 호출 파일의 위치, `api.ts` 구성, request/response 타입 배치 규칙은 `api.md`를 따른다.

## 서버 상태 관리 원칙

### 서버 데이터 패칭은 TanStack Query를 사용한다

서버에서 가져오는 데이터는 TanStack Query를 기준으로 관리한다. 컴포넌트 내부에서 `useEffect`와 `fetch`를 직접 조합해 서버 상태를 관리하지 않는다.

이 기준은 로딩, 에러, 캐시, 재요청, 동기화 처리를 일관되게 유지하기 위한 것이다.

### Query는 TanStack Query로 직접 관리한다

query는 TanStack Query를 기준으로 관리하되, custom hook으로 한 번 더 감싸는 것을 기본 규칙으로 두지 않는다. 페이지나 컴포넌트에서 `useQuery`를 직접 선언해도 된다.

허용 예시:

```tsx
const booksQuery = useQuery({
  queryKey: ['books', 'list', page],
  queryFn: () => getBooks({ page }),
});
```

## Query Key 규칙

### queryKey는 배열 형태로 작성한다

queryKey는 항상 배열 형태로 작성한다. 단일 문자열 키는 사용하지 않는다.

### queryKey는 정적 문자열에서 동적 값 순서로 작성한다

queryKey는 리소스를 설명하는 정적 값이 먼저 오고, 식별자나 파라미터 같은 동적 값이 뒤에 오도록 구성한다.

허용 예시:

```tsx
['books', 'detail', bookId]
['books', 'list', page]
```

이 기준은 invalidate와 추적 범위를 예측 가능하게 만들기 위한 것이다.

## Mutation 규칙

### 서버 상태 변경은 useMutation을 사용한다

생성, 수정, 삭제처럼 서버 데이터를 변경하는 작업은 `useMutation`을 기준으로 구현한다.

### 사용자 액션 기반 서버 검증도 useMutation을 사용할 수 있다

HTTP method가 `GET`이더라도 화면 진입 시 자동 조회하는 서버 상태가 아니라, 버튼 클릭 같은 사용자 액션으로 실행하는 서버 검증은 `useMutation`을 사용할 수 있다. 예를 들어 닉네임 사용 가능 여부 확인처럼 실행 시점이 사용자 액션에 묶이고, 성공/실패 후처리가 필요한 API는 mutation으로 다룬다.

허용 예시:

```tsx
const { isPending, mutate: getNicknameAvailability } = useNicknameAvailabilityMutation();

const handleNicknameNext = () => {
  if (isPending) return;

  getNicknameAvailability(nickname, {
    onSuccess: (isAvailable) => {
      if (!isAvailable) return;

      setStep(STEP.TERMS);
    },
  });
};
```

### Mutation은 useMutation으로 직접 관리한다

mutation 역시 custom hook으로 한 번 더 감싸는 것을 기본 규칙으로 두지 않는다. 페이지나 컴포넌트에서 `useMutation`을 직접 선언해도 된다.

다만 특정 화면 전용 mutation이 토스트, 에러 코드 분기, 성공 후처리 같은 UX 정책을 함께 가진다면 페이지 전용 custom hook으로 분리할 수 있다. 이때 hook 반환값은 객체 전체를 그대로 쓰지 않고 필요한 값을 구조분해해서 사용한다.

### 성공 후에는 관련 Query를 동기화한다

mutation 성공 이후에는 `invalidateQueries` 등으로 관련 캐시를 동기화한다. 변경 이후에도 이전 캐시가 남아 있으면 화면과 서버 상태가 어긋날 수 있다.

허용 예시:

```tsx
const updateBookMutation = useMutation({
  mutationFn: (payload: UpdateBookPayload) => updateBook(payload),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['books'],
    });
  },
});
```
