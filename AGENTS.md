## Purpose

This document defines the essential coding standards and architectural principles for the reading journal app **bbaegok**.

The current codebase consists of legacy code from an older version of bbaegok that carries significant technical debt, severely hindering scalability and maintainability. A complete refactor to a new design is planned.

## Global Agent Rules

- All responses must be written in Korean.
- All plans must be written in Korean.

## Tech Stack

- React (Functional Components only)
- TypeScript (strict mode)
- Tanstack Query (server state)
- Zustand (client global state, minimize usage)
- Tailwind
- React Hook Form
- Zod

## Directory Structure (Page based)

### 1. Page is the default unit

- The base structure is **page-based**.
- Every page must be created as a folder.
- Sub-routes are created as folders with the same structure inside the parent page folder.
- The routing structure and folder structure must always match.
- Even for non-page units, a folder can be created if the UI/feature boundary is clear (e.g., sections, flows, steps, tabs, etc.)

### 2. Folder naming & entry file

- Folder names follow the **component (page) name** and use PascalCase.
- The entry component file for a folder must always be **`index.tsx`**.
  - Example: `src/pages/OrderDetail/index.tsx`

### 3. Page-local reuse (shared within the folder)

- Components/logic reused only within a specific page (folder) should not be moved to the global scope.
- Create a **`shared/` directory** inside that folder and manage them there.
  - Example: `src/pages/OrderDetail/shared/*`
- `shared/` only allows things that are "shared within that folder's scope."

### 4. Global modules placement

- Global state: `src/stores`
- Utils: `src/utils`
- Global hooks: `src/hooks`
- Global components: `src/components`

### 5. Example (recommended)

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
- hooks/
- stores/
- utils/
```

## Component Rules

### 1. Component Declaration

- All components must be declared as arrow functions.
- Allowed:

```tsx
export const BookCard = () => {
  return <div />;
};
```

### 2. Component File & Folder Naming

- Component names use PascalCase.
- Components are organized at the folder level (not file level). The folder name is the component name, with `index.tsx` inside.
- Allowed:

```tsx
BookCard / index.tsx;

BookList / index.tsx;
```

### 3. Props Type Declaration

- Props types must be declared with `type`.
- The type name must follow the format **"ComponentName + Props"**.
- Component parameters must be received as `props` and destructured at the very top inside the component.
- Allowed:

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

- Conditional rendering must always return `null`.
- Allowed:

```tsx
export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  if (!book) return null;

  return <div>{book.title}</div>;
};
```

### 5. Handler Declaration

- All event handlers must be declared separately.
- For single-line logic, use a direct reference instead of declaring a function.
- Allowed:

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

- All components must use named exports.
- Allowed:

```tsx
export const BookCard = () => {
  return <div />;
};

import { BookCard } from '@/components/BookCard';
```

### 7. Component Responsibility

- Components are responsible for UI only.
- Data processing and business logic must be separated into hooks.
- Allowed:

```tsx
const useBookCard = () => {
  return { title: 'React' };
};

export const BookCard = (props: BookCardProps) => {
  const { title } = useBookCard();

  return <div>{title}</div>;
};
```

- Forbidden:

```tsx
export const BookCard = () => {
  const data = fetch('/api/book');
  const parsed = process(data);

  return <div>{parsed.title}</div>;
};
```

## State Rules

### 1. Server State Fetching

- Server data fetching must use TanStack Query (React Query) — never `useEffect + fetch` directly.
- Query declarations must be separated into a custom hook at the same level, not defined inside the component.
- Allowed:

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

- `queryKey` must always be written as an array.
- `queryKey` must follow the structure of **resource name + identifier or parameters**.
- `queryKey` must always be ordered as **static string → dynamic value**.
- A single string value form is not allowed.
- Allowed:

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

- Server state changes must use `useMutation`.
- Mutation declarations must be separated into a custom hook at the same level, not defined inside the component.
- On success, synchronize the cache with `invalidateQueries`.
- Allowed:

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

- Minimize the use of Zustand.
- If Zustand usage seems necessary, always confirm with the user before using it.
- Zustand is only used for global UI state.

### 5. Local State Typing

- Component-internal state is managed as local state.
- When declaring local state, always specify the type using generics.
- Allowed:

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

- If `useMemo` or `useCallback` usage seems necessary, always confirm with the user before using it.
- Do not add unnecessary memoization by default.

### 7. Form State Management

- If form state management (React Hook Form + Zod) seems necessary, always confirm with the user before using it.
- Allowed:

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

## Code Ordering

**Code inside a component should be ordered as follows:**

1. State & Ref: `useState`, `useReducer`, `useRef`, `useContext`
2. Data fetching & side effect hooks: `useQuery`, `useMutation`, `useEffect`, `useLayoutEffect`
3. `useMemo`, `useCallback`
4. Event handlers and internal helper functions
5. Render return

**Code inside a file containing components should be ordered as follows:**

1. Imports
2. Interface and type definitions
3. Component-specific constants (consider future i18n support)
4. Component
5. Sub-components
6. Utility functions outside the component
