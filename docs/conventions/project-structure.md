# 프로젝트 구조 컨벤션

## 기본 원칙

라우트 페이지는 폴더 단위로 관리한다.

```txt
src/pages/BookDetail/
  index.tsx
  api.ts
  queries/
  components/
  InfoSection/
  ReviewSection/
```

## 플랫폼 실행 환경

빼곡 프론트엔드는 일반 브라우저 전용 웹사이트가 아니라, 네이티브 앱의 웹뷰 안에서 URL 형태로 로드되는 하이브리드 웹앱이다. 따라서 화면 구현만 고려하지 않고 웹과 네이티브 런타임의 경계를 함께 고려해야 한다.

### 네이티브 연동을 전제로 설계한다

카메라, 공유, 앱 내부 라우팅, 인증 연계, 디바이스 권한처럼 네이티브 기능이 필요한 경우에는 웹 코드 안에서 직접 우회 구현을 늘리기보다 네이티브 브리지 연동을 우선 기준으로 설계한다.

### 웹과 네이티브의 경계를 분리한다

네이티브 기능 접근 코드는 페이지나 컴포넌트에 흩뿌리지 않고, 브리지 진입점 또는 플랫폼 전용 계층으로 모아 관리한다. 이 기준이 있어야 웹뷰 환경 변경이나 브리지 스펙 변경이 발생해도 영향 범위를 좁힐 수 있다.

### 브리지 미연결 환경을 고려한다

로컬 개발, 스토리북, 브라우저 단독 실행처럼 웹뷰 바깥에서 실행되는 경우도 있기 때문에, 브리지 미연결 상태를 기본적으로 감지할 수 있어야 한다. 브리지 의존 기능은 noop, 대체 UI, 제한 안내처럼 안전한 폴백을 제공해야 한다.

### 라우팅과 진입 흐름은 웹뷰 특성을 고려한다

페이지 라우팅, 뒤로 가기, 딥링크, 외부 링크 이동은 브라우저 단독 환경과 동일하다고 가정하지 않는다. 웹 라우터 동작만 맞추는 것으로 끝내지 않고, 네이티브 컨테이너의 이동 규칙과 함께 검토해야 한다.

## 페이지 폴더

페이지 폴더 이름은 PascalCase를 사용한다.

```txt
src/pages/BookDetail/
src/pages/MyPage/Account/
```

페이지 진입 파일은 `index.tsx`를 사용한다.

```txt
src/pages/BookDetail/index.tsx
```

`BookDetailPage.tsx`처럼 라우트 페이지를 단일 파일로 만들지 않는다. 기존 단일 파일은 리팩토링 시 폴더 구조로 옮긴다.

## 페이지 폴더 내부 역할

페이지 루트에는 페이지 조립에 필요한 주요 진입점만 둔다.

```txt
BookDetail/
  index.tsx
  api.ts
  queries/
  components/
  InfoSection/
  ReviewSection/
```

- `index.tsx`: 페이지 진입점, 상태 분기, 이벤트 핸들러, 화면 조립
- `api.ts`: 해당 페이지 범위의 API 호출 함수와 request/response 타입
- `queries/`: 해당 페이지 범위의 Query hook
- `components/`: 해당 페이지 전용 UI 조각
- `InfoSection/`, `ReviewSection/`: 의미 있는 큰 섹션

## components

페이지 전용 UI 컴포넌트는 `components/`에 둔다.

예시:

```txt
BookDetail/
  components/
    BookDetailSkeleton.tsx
    BookDetailFallback.tsx
    AddRecordStatusBottomSheet.tsx
```

아래 항목은 페이지 전용이면 `components/`에 둔다.

- fallback
- skeleton
- modal
- bottom sheet
- action sheet
- 페이지 전용 작은 UI 조각

컴포넌트가 복잡해져 하위 컴포넌트, 전용 hook, 전용 query를 가지면 폴더로 승격한다.

```txt
components/
  CoverImageUrlModal/
    index.tsx
    PreviewSection.tsx
```

## sections

페이지 안의 큰 화면 구획은 의미 있는 이름의 폴더로 분리한다.

```txt
BookDetail/
  InfoSection/
  ReviewSection/
```

섹션이 자체 API, Query, 컴포넌트 구조를 가지면 섹션 폴더 내부에 배치한다.

## shared 사용 기준

신규 페이지에서는 페이지 전용 UI 조각을 기본적으로 `components/`에 둔다.

`shared/`는 기존 구조 호환이 필요한 경우나, 페이지 하위 여러 폴더에서 공통으로 쓰는 비 UI성 헬퍼를 분리해야 할 때만 제한적으로 사용한다.

새 구조에서는 `components/`, `queries/`, 큰 섹션 폴더를 우선 사용한다.
