# 상태 관리 컨벤션

## 문서 목적

이 문서는 빼곡 프론트엔드에서 서버 상태와 클라이언트 상태를 어떤 기준으로 관리하는지 정의한다.

상태 관리는 화면 구현 방식뿐 아니라 데이터 일관성, 캐시 전략, 유지보수 비용에 직접 영향을 준다. 이 문서는 상태를 어디에 두고 어떤 도구를 사용해야 하는지에 대한 기본 원칙을 정리한다.

## 서버 상태 관리 원칙

### 서버 데이터 패칭은 TanStack Query를 사용한다

서버에서 가져오는 데이터는 TanStack Query를 기준으로 관리한다. 컴포넌트 내부에서 `useEffect`와 `fetch`를 직접 조합해 서버 상태를 관리하지 않는다.

이 기준은 로딩, 에러, 캐시, 재요청, 동기화 처리를 일관되게 유지하기 위한 것이다.

### Query는 custom hook으로 분리한다

query 선언은 컴포넌트 내부에 직접 작성하지 않고, 같은 레벨의 custom hook으로 분리한다. 컴포넌트는 query 구현보다 결과 사용에 집중해야 한다.

허용 예시:

```tsx
export const useBooksQuery = (page: number) => {
  return useQuery({
    queryKey: ['books', 'list', page],
    queryFn: () => getBooks({ page }),
  });
};
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

### Mutation도 custom hook으로 분리한다

mutation 선언 역시 컴포넌트 내부가 아니라 custom hook으로 분리한다.

### 성공 후에는 관련 Query를 동기화한다

mutation 성공 이후에는 `invalidateQueries` 등으로 관련 캐시를 동기화한다. 변경 이후에도 이전 캐시가 남아 있으면 화면과 서버 상태가 어긋날 수 있다.

허용 예시:

```tsx
export const useUpdateBookMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateBookPayload) => updateBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });
};
```

## 클라이언트 상태 관리 원칙

### local state를 우선 사용한다

컴포넌트 내부에서 닫힌 상태는 전역 상태로 올리기보다 local state를 우선 사용한다. 상태의 범위보다 큰 저장소를 사용하면 상태 추적과 변경 영향 범위가 불필요하게 커진다.

### local state는 타입을 명시한다

컴포넌트 내부 상태는 `useState` 제네릭으로 타입을 명시한다.

허용 예시:

```tsx
const [count, setCount] = useState<number>(0);
const [title, setTitle] = useState<string>('');
```

## Zustand 사용 기준

### Zustand는 최소한으로 사용한다

Zustand는 프로젝트 전역에서 공유해야 하는 UI 상태처럼 local state로 처리하기 어려운 경우에만 사용한다.

### 전역 UI 상태가 아닌 경우에는 도입을 먼저 검토한다

상태가 여러 화면에서 공유된다는 이유만으로 바로 Zustand에 올리지 않는다. 실제로 전역 저장소가 필요한지 먼저 판단해야 한다.

## Memoization 사용 기준

### `useMemo`, `useCallback`은 기본 선택지가 아니다

memoization은 성능 문제를 해결하거나 참조 안정성이 실제로 필요한 경우에만 사용한다. 불필요한 `useMemo`, `useCallback`은 코드를 복잡하게 만들고 읽기 비용을 높인다.

기본적으로는 단순한 코드 구조를 우선하고, 필요한 경우에만 도입한다.

## 폼 상태 관리 원칙

### 복잡한 폼은 RHF와 Zod를 기준으로 관리한다

폼 입력 상태, 유효성 검사, 제출 흐름이 필요한 경우에는 React Hook Form과 Zod 조합을 우선 고려한다.

이 기준은 타입 안정성과 검증 로직의 일관성을 유지하기 위한 것이다.

허용 예시:

```tsx
const schema = z.object({
  title: z.string(),
  author: z.string(),
});

type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

### 단순 입력까지 무조건 폼 라이브러리로 감싸지 않는다

화면 규모와 검증 복잡도에 비해 과한 추상화가 되지 않도록, 단순한 입력은 local state로 처리할 수 있다.
