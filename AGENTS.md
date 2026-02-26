## 목적

이 문서는 독서기록 앱 빼곡의 필수 코딩 표준과 아키텍처 원칙을 정의한다.

현재 코드베이스는 빼곡의 구 버전으로 확장성과 유지보수성을 저해하는 고도로 기술적인 부채가 많은 레거시 코드로 구성있으므로, 완전히 새로운 디자인으로 리팩토링을 진행하려고 한다.

## Global Agent Rules

- 모든 응답은 반드시 한국어로 작성한다.
- 모든 Plan은 반드시 한국어로 작성한다.

## Planning Execution Rules

- 사용자가 플래닝(Plan)을 요청한 경우, 반드시 전체 작업을 여러 개의 단계로 나누어 단계별로 계획을 작성해야 한다.
- 한 번에 모든 단계를 수행하거나 여러 단계를 동시에 수행해서는 안 된다.
- 반드시 현재 단계 하나만 수행해야 한다.
- 각 단계가 완료되면, 다음 단계를 수행하기 전에 반드시 사용자에게 확인을 요청해야 한다.
- 사용자의 명시적인 승인 없이 다음 단계로 진행해서는 절대 안 된다.
- 사용자의 승인 없이 새로운 파일 생성, 기존 파일 수정, 리팩토링, 또는 추가 작업을 수행해서는 절대 안 된다.
- 항상 "다음 단계로 진행할까요?" 또는 이에 준하는 명확한 승인 요청으로 단계 종료를 표시해야 한다.

## Figma API Usage Rules

- Figma API에는 요청 횟수 제한(rate limit)이 존재하므로, 동일한 리소스에 대한 반복 요청을 반드시 캐싱하여 사용한다.
- Figma API 요청은 반드시 최소화한다.

## Tech Stack

- React (Functional Components only)
- TypeScript (strict mode)
- Tanstack Query (server state)
- Zustand (client global state, 최소 사용)
- Tailwind
- React Hook Form
- Zod

## Directory Structure (Page based)

### 1. Page is the default unit

- 기본 구조는 **page-based**로 구성한다.
- 모든 페이지는 반드시 폴더로 생성한다.
- 하위 라우트(sub-route)는 부모 페이지 폴더 내부에 동일한 구조의 폴더로 생성한다.
- 라우팅 구조와 폴더 구조는 항상 일치해야 한다.
- 페이지가 아니더라도, UI/기능 단위가 명확하면 폴더로 만들 수 있다. (예: 섹션, 플로우, 스텝, 탭 등)

### 2. Folder naming & entry file

- 폴더 이름은 **컴포넌트(페이지) 이름**을 따르며 PascalCase를 사용한다.
- 폴더의 엔트리 컴포넌트 파일은 **반드시 `index.tsx`** 로 한다.
  - 예: `src/pages/OrderDetail/index.tsx`

### 3. Page-local reuse (shared within the folder)

- 특정 페이지(폴더) 내부에서만 재사용되는 컴포넌트/로직은 전역으로 빼지 않는다.
- 해당 폴더 내부에 **`shared/` 디렉터리**를 만들고 그 안에서 관리한다.
  - 예: `src/pages/OrderDetail/shared/*`
- `shared/`는 “그 폴더 스코프에서만 공유”되는 것만 허용한다.

### 4. Global modules placement

- 전역 상태: `src/stores`
- 유틸: `src/utils`
- 전역 훅: `src/hooks`
- 전역 컴포넌트: `src/components`

### 5. Global Components Rules

- `src/components` 아래의 모든 글로벌 컴포넌트는 스토리북 파일을 포함해야 한다.
- 스토리북 파일은 컴포넌트와 같은 폴더에 생성한다.

### 6. Example (recommended)

```tsx
src/
- pages/
  - OrderDetail/
      - index.tsx
      - useOrderDetailState.ts
      - shared/
        - Title.tsx
        - Content.tsx
- components/
  - Button/
    - index.tsx
    - index.stories.tsx
- hooks/
- stores/
- utils/
```

## Component Rules

### 1. Component Declaration

- 모든 컴포넌트는 반드시 arrow function으로 선언한다.
- 허용:
  ```tsx
  export const BookCard = () => {
    return <div />;
  };
  ```

### 2. Component File & Folder Naming

- 컴포넌트 이름은 PascalCase를 사용한다.
- 컴포넌트는 파일이 아닌 폴더 단위로 구성하며, 폴더 이름을 컴포넌트 이름으로 사용하고 내부에 index.tsx를 사용한다.
- 허용:

  ```tsx
  BookCard / index.tsx;

  BookList / index.tsx;
  ```

### 3. Props Type Declaration

- props 타입은 반드시 type으로 선언한다.
- 타입 이름은 반드시 "컴포넌트이름 + Props" 형태로 작성한다.
- 컴포넌트 파라미터는 반드시 props 이름으로 받고, 컴포넌트 내부 최상단에서 구조분해한다.
- optional props의 기본값은 컴포넌트 내부에서 별도로 처리하지 않고, 반드시 구조 분해 시점에서 정의한다.
- 허용:

  ```tsx
  type BookCardProps = {
    title: string;
    author: string;
  };

  export const BookCard = (props: BookCardProps) => {
    const { title, author } = props;

    return <div>{title}</div>;
  };
  ```

### 4. Conditional Rendering

- 컴포넌트 전체를 렌더링하지 않을 경우 반드시 early return으로 null을 반환한다.
- JSX 내부의 조건부 렌더링은 반드시 logical AND (&&)를 사용한다.
- ternary operator는 두 개의 명확한 분기가 있을 때만 사용한다.
- 허용:

  ```tsx
  export const BookCard = (props: BookCardProps) => {
    const { book, isLoading, isSelected, isVisibleTitle } = props;

    if (!book) return null;

    return (
      <div className="book-card">
        {isVisibleTitle && <div className="book-title">{title}</div>}
        <span className="book-status">{isSelected ? '선택됨' : '선택되지 않음'}</span>
      </div>
    );
  };
  ```

### 5. Handler Declaration

- 모든 event handler는 반드시 분리하여 선언한다.
- 한 줄 로직일 경우 함수 선언 대신 직접 참조를 사용한다.
- 허용:

  ```tsx
  const handleClick = doSomething;

  return <button onClick={handleClick} />;

  or;

  const handleClick = () => {
    doSomething();
    logEvent();
  };

  return <button onClick={handleClick} />;
  ```

### 6. Named Export Only

- 모든 컴포넌트는 named export를 사용한다.
- 허용:

  ```tsx
  export const BookCard = () => {
    return <div />;
  };

  import { BookCard } from '@/components/BookCard';
  ```

### 7. Component Responsibility

- 컴포넌트는 UI 역할만 담당한다.
- 데이터 처리 및 비즈니스 로직은 hook으로 분리한다.
- 허용

  ```tsx
  const useBookCard = () => {
    return { title: 'React' };
  };

  export const BookCard = (props: BookCardProps) => {
    const { title } = useBookCard();

    return <div>{title}</div>;
  };
  ```

- 금지:

  ```tsx
  export const BookCard = () => {
    const data = fetch('/api/book');
    const parsed = process(data);

    return <div>{parsed.title}</div>;
  };
  ```

## State Rules

### 1. Server State Fetching

- 서버 데이터 패칭은 useEffect + fetch를 직접 호출하지 않고, 반드시 TanStack Query(React Query)를 사용한다.
- query 선언은 컴포넌트 내부가 아닌, 같은 레벨의 custom hook으로 분리하여 정의한다.
- 허용

  ```tsx
  export const useBooksQuery = (page: number) => {
    return useQuery({
      queryKey: bookKeys.list({ page }),
      queryFn: () => getBooks({ page }),
    });
  };

  export const Books = () => {
    const { data, isLoading, error } = useBooksQuery(1);

    if (isLoading) return null;
    if (error) return null;

    return <div>{data?.items?.length ?? 0}</div>;
  };
  ```

### 2. Query Key Rules

- queryKey는 반드시 배열(Array) 형태로 작성한다.
- queryKey는 반드시 **리소스명 + 식별자 또는 파라미터** 구조로 작성한다.
- queryKey는 항상 **정적 문자열 → 동적 값 순서**로 작성한다.
- 문자열 단일 값 형태는 허용하지 않는다.
- 허용:
  ```tsx
  export const useBookDetailQuery = (bookId: string) => {
    return useQuery({
      queryKey: ['books', 'detail', bookId],
      queryFn: () => getBook(bookId),
      enabled: Boolean(bookId),
    });
  };
  ```

### 3. Server State Update (Mutation)

- 서버 상태 변경은 useMutation을 사용한다.
- mutation 선언은 컴포넌트 내부가 아닌, 같은 레벨의 custom hook으로 분리하여 정의한다.
- 성공 시 invalidateQueries로 캐시를 동기화한다.
- 허용

  ```tsx
  export const useUpdateBookMutation = () => {
    return useMutation({
      mutationFn: (payload: UpdateBookPayload) => updateBook(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: bookKeys.all,
        });
      },
    });
  };

  export const BookEdit = () => {
    const mutation = useUpdateBookMutation();

    const handleSave = () => {
      mutation.mutate({
        id: bookId,
        title,
      });
    };

    return <button onClick={handleSave} />;
  };
  ```

### 4. Zustand Usage

- Zustand 사용은 최소화한다.
- Zustand 사용이 필요해 보일 경우, 반드시 사용자에게 사용 여부를 먼저 확인한다.
- Zustand는 전역 UI 상태에만 사용한다.

### 5. Local State Typing

- 컴포넌트 내부 상태는 local state로 관리한다.
- local state 선언 시 반드시 제네릭으로 타입을 지정한다.
- 허용

  ```tsx
  const [count, setCount] = useState<number>(0);

  const [title, setTitle] = useState<string>('');

  type Book = {
    id: string;
    title: string;
  };

  const [books, setBooks] = useState<Book[]>([]);
  ```

### 6. Memoization Usage

- useMemo, useCallback 사용이 필요해 보일 경우, 반드시 사용자에게 사용 여부를 먼저 확인한다.
- 불필요한 memoization을 기본적으로 생성하지 않는다.

### 7. Form State Management

- 폼 상태 관리(React Hook Form(RHF) + Zod)가 필요해 보일 경우, 반드시 사용자에게 사용 여부를 먼저 확인한다.
- 허용

  ```tsx
  const schema = z.object({
    title: z.string(),
    author: z.string(),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('title')} />
    </form>
  );
  ```

## Naming

- 상수 이름은 `MSG_{DOMAIN}_{CONTEXT}` 형식을 따른다.
  - `DOMAIN`: 메시지가 속한 기능 또는 도메인 (예: AUTH, BOOK, USER, SEARCH)
  - `CONTEXT`: 메시지가 사용되는 상황 또는 목적 (예: PLACEHOLDER, TITLE, DESCRIPTION, SUCCESS, ERROR, EMPTY, CONFIRM)

## Code Ordering

- **컴포넌트 내부 코드는 다음과 같이 배치한다.**
  1. State & Ref : useState, useReducer, useRef, useContext
  2. Data fetching, Side Effect hook : useQuery, useMutation, useEffect, useLayoutEffect
  3. useMemo, useCallback
  4. 이벤트 핸들러, 내부 헬퍼 함수
  5. Render 반환부
- **컴포넌트를 포함한 파일 내부는 다음과 같이 배치한다.**
  1. import
  2. type 정의
  3. 컴포넌트 전용 상수(추후 다국어 지원을 고려할 것)
  4. 컴포넌트

## Style Class

- 컴포넌트의 **조건부 스타일 클래스**는 JSX 내부에서 직접 작성하지 않고, 반드시 상수로 분리하여 선언한다.
- 스타일 관련 변수는 의미 기반 이름을 사용한다.
- 조건부 스타일이 아닌경우, inline으로 작성한다.
- 허용

  ```tsx
  const sizeClass = size === 'small' ? 'h-8 px-3 text-sm' : 'h-12 px-5 text-base';

  return <button className={`${sizeClass} inline-flex items-center justify-center`}>Click</button>;
  ```

### **빼곡용**

### Legacy Code Protection Rules

`legacy` 디렉토리는 보호된 영역이며, 에이전트는 이 영역의 코드를 수정해서는 안 된다.

### 목적

legacy 코드는 기존 시스템과의 호환성을 위해 유지되는 코드이며, 현재 리팩토링 범위에 포함되지 않는다.
legacy 코드를 수정하면 예기치 않은 사이드 이펙트와 안정성 문제가 발생할 수 있다.

### 보호 범위

다음 경로는 모두 보호 대상이다:

- src/legacy/\*\*
- legacy/\*\*

이 경로 아래의 모든 파일은 legacy 코드로 간주한다.

### 절대 규칙

다음 조건에서도 legacy 코드를 수정해서는 안 된다:

- 새로운 컴포넌트 변경으로 인해 import 에러가 발생하는 경우
- props 타입이 변경된 경우
- 타입 에러가 발생하는 경우
- legacy 코드가 현재 컴포넌트를 import 하고 있는 경우
- 자동 리팩토링이 가능한 경우

legacy 코드는 read-only 영역으로 취급해야 한다.

### 허용되는 작업

에이전트는 다음 작업만 수행할 수 있다:

- legacy 코드를 읽는 것 (분석 목적)
- legacy 코드를 참조하는 것

### 금지되는 작업

에이전트는 다음 작업을 수행해서는 안 된다:

- legacy 파일 수정
- legacy 파일 포맷 변경
- legacy 파일 import 변경
- legacy 파일 props 변경
- legacy 파일 자동 리팩토링

### 변경 필요 시 처리 방법

legacy 코드와 충돌이 발생하는 경우:

- legacy 코드를 수정하지 않는다.
- 대신 새로운 코드에서 호환 레이어(wrapper, adapter 등)를 만든다.
- 또는 사용자에게 명시적으로 legacy 수정 허용 여부를 요청한다.

### 핵심 원칙

Legacy code is strictly read-only unless explicitly instructed by the user.
