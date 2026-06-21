# API 컨벤션

## 문서 목적

이 문서는 빼곡 프론트엔드에서 API 호출 코드를 어떤 위치에 두고, 어떤 단위로 관리할지 정의한다.

API 코드는 단순한 네트워크 호출을 넘어 request/response 타입, DTO 변환, 서버 상태 연결 방식까지 함께 영향을 준다. 이 문서는 API 관련 코드를 흩뜨리지 않고, 페이지 또는 도메인 문맥 안에서 읽기 쉽게 유지하기 위한 기본 원칙을 정리한다.

## 기본 원칙

### API 호출 코드는 사용처 가까이에 둔다

API 호출 함수는 전역 `services/` 폴더에 모으는 것보다, 실제로 사용하는 페이지 또는 도메인 폴더 가까이에 두는 것을 기본값으로 삼는다.

허용 예시:

```tsx
src/pages/SignUp/
- index.tsx
- api.ts
```

### 기본 파일명은 `api.ts`를 사용한다

페이지 또는 도메인 범위에서 API 호출을 관리할 때는 `api.ts`를 기본 파일명으로 사용한다.

이 기준이 있어야 화면 폴더를 열었을 때 API 진입점을 빠르게 찾을 수 있다.

### 컴포넌트 내부에 raw API 호출 코드를 직접 두지 않는다

컴포넌트는 UI 렌더링과 서버 상태 연결에 집중하고, 실제 엔드포인트 호출 함수는 `api.ts`로 분리한다.

이 기준은 화면 코드와 API 스펙 코드를 섞지 않기 위한 것이다.

## 타입 규칙

### request/response 타입은 `api.ts`에 함께 둔다

API 스펙에 직접 대응하는 request/response 타입은 기본적으로 해당 호출 함수를 선언한 `api.ts` 파일 안에 함께 둔다.

허용 예시:

```ts
type GetTermsResponse = {
  items: {
    id: number;
    title: string;
    required: boolean;
  }[];
};

export const getTerms = async () => {
  // ...
};
```

### UI 타입과 API 타입은 구분한다

서버 응답 DTO와 화면에서 실제로 사용하는 UI 타입은 같은 것으로 취급하지 않는다.

응답 데이터를 그대로 렌더링하지 않고 화면용 구조로 가공한다면, UI 타입과 변환 로직은 페이지 문맥에 맞는 위치에서 별도로 선언한다.

### 공용 타입은 예외적으로만 분리한다

여러 API 호출이 같은 request/response 타입을 공유하거나, 여러 화면에서 공통으로 쓰는 모델일 때만 별도 타입 파일로 분리한다.

그 외에는 전역 `types/`를 기본 저장소처럼 사용하지 않는다.

## TanStack Query 연결 규칙

### API 호출 함수와 Query 선언은 분리한다

`api.ts`는 순수하게 호출 함수와 DTO 타입을 관리하고, `useQuery`, `useMutation` 선언은 페이지나 컴포넌트에서 직접 작성하는 것을 기본값으로 삼는다.

허용 예시:

```tsx
const termsQuery = useQuery({
  queryKey: ['signup', 'terms'],
  queryFn: getTerms,
});
```

### `queries.ts`는 기본 선택지가 아니다

React Query 선언을 별도 파일로 한 번 더 감싸는 구조는 기본값이 아니다. 여러 컴포넌트가 같은 Query 로직을 공유하거나, 페이지 코드가 과도하게 비대해질 때만 분리를 검토한다.

## 분리 기준

### 처음부터 `model.ts`, `queries.ts`를 만들지 않는다

기본 구조는 아래처럼 최대한 단순하게 시작한다.

```tsx
src/pages/SignUp/
- index.tsx
- api.ts
```

### 파일이 커질 때만 추가 분리를 검토한다

아래 조건 중 하나가 생기면 그때 `model.ts`, `queries.ts`, 별도 타입 파일 분리를 검토한다.

- `api.ts`가 지나치게 길어지는 경우
- 여러 컴포넌트가 같은 Query 로직을 공유하는 경우
- 같은 페이지 안에서도 UI 모델과 DTO 변환이 복잡해지는 경우
- 여러 API가 공통 타입을 반복해서 공유하는 경우

## 하지 말아야 할 것

- 전역 `services/` 폴더를 기본 저장소처럼 사용하지 않는다
- 컴포넌트 파일 안에 엔드포인트 문자열과 raw 요청 로직을 직접 쌓지 않는다
- 서버 응답 DTO를 화면 타입처럼 그대로 사용하지 않는다
- 작은 API 하나를 위해 `model.ts`, `queries.ts`, `types.ts`를 처음부터 모두 만들지 않는다
