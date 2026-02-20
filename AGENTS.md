## Purpose

This document defines the essential coding standards and architectural principles for the reading log app **Bbaegok**.

The current codebase consists of legacy code from an older version of Bbaegok, which carries significant technical debt that hinders scalability and maintainability. A full refactor with a completely new design is underway.

---

## Global Agent Rules

- All responses must be written in English.
- All Plans must be written in English.
- Always perform tasks in the smallest possible units.
- Do not modify many files at once.
- When multiple file changes are required, proceed one step at a time.
- After each step, request user confirmation before proceeding to the next.
- Do not proceed to the next step without explicit user approval.

---

## Figma API Usage Rules

- Figma API has rate limits, so responses for the same resource must always be cached and reused.
- Figma API requests must be minimized.

---

## Tech Stack

- React (Functional Components only)
- TypeScript (strict mode)
- Tanstack Query (server state)
- Zustand (client global state, use minimally)
- Tailwind
- React Hook Form
- Zod

---

## Directory Structure (Page Based)

### 1. Page is the default unit

- The base structure is **page-based**.
- Every page must be created as a folder.
- Sub-routes are created as folders with the same structure inside the parent page folder.
- The routing structure and folder structure must always match.
- Even non-page units with a clear UI/functional boundary can be organized as folders (e.g., sections, flows, steps, tabs).

### 2. Folder naming & entry file

- Folder names follow the **component (page) name** and use PascalCase.
- The entry component file inside the folder must always be **`index.tsx`**.
  - Example: `src/pages/OrderDetail/index.tsx`

### 3. Page-local reuse (shared within the folder)

- Components/logic reused only within a specific page (folder) should not be extracted globally.
- Create a **`shared/` directory** inside the folder and manage them there.
  - Example: `src/pages/OrderDetail/shared/*`
- `shared/` only allows items that are "shared within that folder's scope."

### 4. Global modules placement

- Global state: `src/stores`
- Utilities: `src/utils`
- Global hooks: `src/hooks`
- Global components: `src/components`

### 5. Global Components Rules

- All global components under `src/components` must include a Storybook file.
- Storybook files are created in the same folder as the component.

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

---

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
- Components are organized by folder (not file), using the component name as the folder name with `index.tsx` inside.
- Allowed:

```tsx
BookCard / index.tsx;

BookList / index.tsx;
```

### 3. Props Type Declaration

- Props types must be declared using `type`.
- The type name must follow the format **"ComponentName + Props"**.
- Component parameters must be received as `props` and destructured at the top of the component body.
- Default values for optional props must be defined at the point of destructuring, not handled separately inside the component.
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

- If the entire component should not render, always return `null` via early return.
- Conditional rendering inside JSX must use logical AND (`&&`).
- Ternary operators should only be used when there are two clear branches.
- Allowed:

```tsx
export const BookCard = (props: BookCardProps) => {
  const { book, isLoading, isSelected, isVisibleTitle } = props;

  if (!book) return null;

  return (
    <div className="book-card">
      {isVisibleTitle && <div className="book-title">{title}</div>}
      <span className="book-status">{isSelected ? 'Selected' : 'Not selected'}</span>
    </div>
  );
};
```

### 5. Handler Declaration

- All event handlers must be declared separately.
- If the logic is a single line, use direct reference instead of a function declaration.
- Allowed:

```tsx
const handleClick = doSomething;

return <button onClick={handleClick} />;

// or

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

- Prohibited:

```tsx
export const BookCard = () => {
  const data = fetch('/api/book');
  const parsed = process(data);

  return <div>{parsed.title}</div>;
};
```

---

## State Rules

### 1. Server State Fetching

- Server data fetching must use TanStack Query (React Query), not `useEffect` + direct `fetch` calls.
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

- `queryKey` must always be in array form.
- `queryKey` must follow the structure of **resource name + identifier or parameters**.
- `queryKey` must always be ordered as **static strings → dynamic values**.
- Single string values are not allowed.
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
- On success, synchronize the cache using `invalidateQueries`.
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
- If Zustand usage seems necessary, always confirm with the user first.
- Zustand is used only for global UI state.

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

- If `useMemo` or `useCallback` usage seems necessary, always confirm with the user first.
- Do not create unnecessary memoization by default.

### 7. Form State Management

- If form state management (React Hook Form + Zod) seems necessary, always confirm with the user first.
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

---

## Naming

- Constant names follow the format `MSG_{DOMAIN}_{CONTEXT}`.
  - `DOMAIN`: The feature or domain the message belongs to (e.g., AUTH, BOOK, USER, SEARCH)
  - `CONTEXT`: The situation or purpose where the message is used (e.g., PLACEHOLDER, TITLE, DESCRIPTION, SUCCESS, ERROR, EMPTY, CONFIRM)

---

## Code Ordering

**Code inside a component must be arranged in the following order:**

1. State & Ref: `useState`, `useReducer`, `useRef`, `useContext`
2. Data fetching, Side Effect hooks: `useQuery`, `useMutation`, `useEffect`, `useLayoutEffect`
3. `useMemo`, `useCallback`
4. Event handlers and internal helper functions
5. Render return

**Code inside a file (including components) must be arranged in the following order:**

1. Imports
2. Type definitions
3. Component-specific constants (with future i18n support in mind)
4. Component

---

## Style Class

- Conditional style classes for components must not be written directly inside JSX. They must be extracted and declared as constants.
- Style-related variables should use meaning-based names.
- Allowed:

```tsx
const sizeClass = size === 'small' ? 'h-8 px-3 text-sm' : 'h-12 px-5 text-base';

return <button className={`${sizeClass} inline-flex items-center justify-center`}>Click</button>;
```

---

## Bbaegok-Specific Rules

### Legacy Code Protection Rules

The `legacy` directory is a protected area and the agent must not modify any code in this area.

#### Purpose

Legacy code is maintained for compatibility with existing systems and is not within the current refactoring scope. Modifying legacy code can cause unexpected side effects and stability issues.

#### Protected Scope

All paths below are protected:

- `src/legacy/**`
- `legacy/**`

All files under these paths are treated as legacy code.

#### Absolute Rules

Legacy code must not be modified even under the following conditions:

- When a new component change causes an import error
- When prop types have changed
- When a type error occurs
- When legacy code imports the current component
- When automatic refactoring is possible

Legacy code must be treated as a **read-only** area.

#### Permitted Actions

The agent may only perform the following actions:

- Reading legacy code (for analysis purposes)
- Referencing legacy code

#### Prohibited Actions

The agent must not perform the following actions:

- Modifying legacy files
- Reformatting legacy files
- Changing legacy file imports
- Changing legacy file props
- Auto-refactoring legacy files

#### Handling Required Changes

When a conflict occurs with legacy code:

- Do not modify the legacy code.
- Instead, create a compatibility layer (wrapper, adapter, etc.) in the new code.
- Or explicitly ask the user whether modification of legacy code is permitted.

#### Core Principle

**Legacy code is strictly read-only unless explicitly instructed by the user.**
