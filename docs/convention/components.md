# 컴포넌트 컨벤션

## 문서 목적

이 문서는 빼곡 프론트엔드에서 컴포넌트를 작성할 때 따르는 공통 규칙을 정의한다.

컴포넌트는 화면을 빠르게 구현하는 단위이지만, 작성 방식이 제각각이면 재사용성과 가독성이 빠르게 무너진다. 이 문서는 컴포넌트 선언 방식, 파일 구조, props 처리, 렌더링 방식, 책임 분리를 일관되게 유지하기 위한 기준을 정리한다.

## 컴포넌트 선언 원칙

### 함수형 컴포넌트를 사용한다

빼곡 프론트엔드의 컴포넌트는 함수형 컴포넌트를 기준으로 작성한다.

### 컴포넌트는 arrow function으로 선언한다

컴포넌트 선언 방식은 arrow function으로 통일한다. 선언 형태를 통일하면 파일을 훑을 때 구조를 빠르게 파악할 수 있고, 팀 내 코드 스타일 편차도 줄일 수 있다.

허용 예시:

```tsx
export const BookCard = () => {
  return <div />;
};
```

## 파일 및 폴더 구조

### 컴포넌트 이름은 PascalCase를 사용한다

컴포넌트 이름과 폴더 이름은 PascalCase를 사용한다.

### 컴포넌트는 폴더 단위로 구성한다

컴포넌트는 파일 하나로 두기보다 폴더 단위로 구성한다. 이렇게 해야 컴포넌트 전용 타입, 스토리, 테스트, 하위 요소가 필요해질 때 자연스럽게 확장할 수 있다.

### 엔트리 파일은 `index.tsx`를 사용한다

컴포넌트 폴더의 진입 파일은 `index.tsx`를 사용한다.

허용 예시:

```tsx
BookCard / index.tsx;

BookList / index.tsx;
```

## Props 규칙

### props 타입은 `type`으로 선언한다

컴포넌트 props 타입은 `interface` 대신 `type`을 기본으로 사용한다.

### props 타입 이름은 `컴포넌트이름 + Props` 형식을 사용한다

props 타입 이름은 컴포넌트 이름과 직접 연결되도록 작성한다.

허용 예시:

```tsx
type BookCardProps = {
  title: string;
  author: string;
};
```

### 컴포넌트 파라미터는 `props`로 받고 내부에서 구조분해한다

컴포넌트 시그니처에서 바로 구조분해하지 않고, `props`를 받은 뒤 컴포넌트 내부 최상단에서 구조분해한다. 이 방식은 타입과 실제 사용 값을 분리해서 읽기 쉽게 만들고, props 처리 기준을 일관되게 유지한다.

허용 예시:

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

### optional props의 기본값은 구조분해 시점에서 처리한다

optional props의 기본값은 컴포넌트 본문 중간에서 따로 보정하지 않고, 구조분해 시점에서 처리한다. 기본값이 어디에서 정해지는지 바로 드러나게 하기 위한 규칙이다.

## 렌더링 규칙

### 컴포넌트 전체를 숨길 때는 early return을 사용한다

컴포넌트 전체를 렌더링하지 않아야 하는 경우에는 return 내부에서 복잡하게 분기하지 말고, 상단에서 early return으로 `null`을 반환한다.

허용 예시:

```tsx
export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  if (!book) return null;

  return <div>{book.title}</div>;
};
```

### JSX 내부의 단일 조건 렌더링은 `&&`를 우선 사용한다

화면 일부를 조건부로 보여줄 때는 `&&`를 우선 사용한다. 단일 조건을 삼항 연산자로 표현하면 불필요한 시각적 복잡도가 생긴다.

허용 예시:

```tsx
{
  isVisibleTitle && <div className="book-title">{title}</div>;
}
```

### 삼항 연산자는 두 개의 명확한 분기가 있을 때만 사용한다

두 값 중 하나를 반드시 렌더링해야 하는 경우에만 삼항 연산자를 사용한다. 단일 조건 표시 용도로 남용하지 않는다.

## 이벤트 핸들러 규칙

### 이벤트 핸들러는 분리해서 선언한다

클릭, 제출, 토글처럼 사용자 이벤트를 처리하는 로직은 JSX 내부에 직접 쓰지 않고 별도의 핸들러로 분리한다. 이 기준은 렌더링 영역과 동작 영역을 분리해 읽기 쉽게 만들기 위한 것이다.

허용 예시:

```tsx
const handleClick = () => {
  doSomething();
  logEvent();
};

return <button onClick={handleClick} />;
```

### 한 줄 로직은 직접 참조를 사용할 수 있다

별도 래핑이 필요 없는 경우에는 기존 함수를 그대로 참조할 수 있다.

허용 예시:

```tsx
const handleClick = doSomething;

return <button onClick={handleClick} />;
```

## Export 규칙

### 컴포넌트는 named export를 기본으로 사용한다

컴포넌트 export는 named export를 기본으로 사용한다. named export는 import 대상이 명확하고, 파일 이동이나 리팩토링 시 검색과 추적이 쉽다.

권장 예시:

```tsx
export const BookCard = () => {
  return <div />;
};
```

## 책임 분리 원칙

### 컴포넌트는 UI 역할에 집중한다

컴포넌트는 렌더링과 사용자 상호작용 표현에 집중하고, 데이터 처리나 비즈니스 로직은 가능한 한 별도 hook으로 분리한다.

이 기준은 컴포넌트를 테스트하고 재사용하기 쉽게 만들고, 데이터 흐름을 명확하게 유지하는 데 도움이 된다.

허용 예시:

```tsx
const useBookCard = () => {
  return { title: 'React' };
};

export const BookCard = (props: BookCardProps) => {
  const { title } = useBookCard();

  return <div>{title}</div>;
};
```

비권장 예시:

```tsx
export const BookCard = () => {
  const data = fetch('/api/book');
  const parsed = process(data);

  return <div>{parsed.title}</div>;
};
```
