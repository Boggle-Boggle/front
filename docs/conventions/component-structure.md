# 컴포넌트 구조 컨벤션

## 컴포넌트 선언

컴포넌트는 arrow function으로 선언한다.

```tsx
export const BookCard = () => {
  return <div />;
};
```

## Props 규칙

props 타입은 `type`으로 선언한다.

props 타입 이름은 `컴포넌트이름 + Props` 형식을 사용한다.

```tsx
type BookCardProps = {
  title: string;
  author: string;
};
```

컴포넌트 파라미터는 `props`로 받고, 컴포넌트 내부에서 구조분해한다.

```tsx
export const BookCard = (props: BookCardProps) => {
  const { title, author } = props;

  return <div>{title}</div>;
};
```

optional props의 기본값은 구조분해 시점에서 처리한다.

```tsx
type ButtonProps = {
  size?: 'small' | 'medium';
};

export const Button = (props: ButtonProps) => {
  const { size = 'medium' } = props;

  return <button className={size} />;
};
```

## Export 규칙

컴포넌트는 named export를 기본으로 사용한다.

```tsx
export const BookCard = () => {
  return <div />;
};
```

## JSX와 스타일 작성 원칙

의미 없는 wrapper는 만들지 않는다.

`div`는 레이아웃, 그룹핑, 스타일 적용처럼 명확한 역할이 있을 때만 사용한다. 단순히 `div`를 semantic element로 기계적으로 바꾸지 않는다. 우선 제거할 수 있는 wrapper인지 확인하고, 실제 문서 구조상 의미가 있을 때만 semantic element를 사용한다.

스타일은 최대한 디자인 토큰과 상속을 활용한다.

- 색상, 배경, 폰트, 간격은 하드코딩보다 프로젝트에 정의된 토큰을 우선 사용한다.
- 상위 컴포넌트에서 이미 정의한 `bg`, font, text color, layout context가 있으면 하위 컴포넌트에서 중복 선언하지 않는다.
- 하위 컴포넌트는 꼭 달라져야 하는 스타일만 명시한다.
- 반복되는 스타일 조합은 inline class를 계속 늘리기보다 공용 컴포넌트나 토큰화 가능한 형태로 정리한다.

## 컴포넌트 내부 순서

페이지 컴포넌트 내부는 아래 순서를 따른다.

1. Router hooks
2. Store hooks
3. Local state/ref
4. Server state hooks
5. UI/custom hooks
6. Effects
7. Event handlers
8. Derived render values
9. Loading/error/resource not found early returns
10. JSX

예시:

```tsx
const BookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isbn13 = '' } = useParams();
  const { addToast } = useToastStore();
  const { push } = useLayerStore();

  const [activeTab, setActiveTab] = useState<DetailTabType>('info');
  const titleRef = useRef<HTMLParagraphElement>(null);

  const queryClient = useQueryClient();
  const {
    data: bookDetail,
    error: bookDetailError,
    isLoading: isBookDetailLoading,
    isError: isBookDetailError,
  } = useBookDetailQuery(isbn13);
  const { mutate: toggleWishlist, isPending: isToggleWishlistPending } = useToggleWishlistMutation();

  const scrollContainerRef = useScrollRestoration<HTMLDivElement>({
    isReady: bookDetail !== undefined,
  });

  useEffect(() => {
    // effect
  }, []);

  const handleChangeDetailTab = setActiveTab;

  const title = bookDetail?.title;

  if (isBookDetailLoading) return <BookDetailSkeleton />;
  if (isBookDetailError || !bookDetail) {
    return <BookDetailFallback error={bookDetailError} onBackClick={handleBackClick} />;
  }

  return <BookDetailContent />;
};
```

## 같은 hook 그룹 내부 순서

컴포넌트 상단 초기화 구간은 한 줄 선언이면 붙여 쓴다.

Router hook과 store hook이 섞여도 모두 한 줄 선언이면 빈 줄을 두지 않는다. 단, state/ref부터는 한 줄을 띄워 화면 내부 상태와 구분한다.

좋은 예:

```tsx
const navigate = useNavigate();
const { recordId = '' } = useParams();
const { push } = useLayerStore();

const [activeTab, setActiveTab] = useState<DetailTabType>('info');
const titleRef = useRef<HTMLParagraphElement>(null);
```

초기화 구간 안에서도 여러 줄 객체 인자나 긴 선언이 생기면 읽기 좋게 구간을 나눈다.

```tsx
const navigate = useNavigate();
const scrollContainerRef = useScrollRestoration<HTMLDivElement>({
  isReady: bookDetail !== undefined,
});

const { push } = useLayerStore();
```

## 상태와 ref

local state와 ref는 store hook 아래, server state hook 위에 둔다.

상태는 항상 명시적 generic으로 선언한다.

```tsx
const [activeTab, setActiveTab] = useState<DetailTabType>('info');
const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
const [nickname, setNickname] = useState<string>('');
```

상태 선언은 화면 흐름에서 중요한 값부터 배치한다.

```tsx
const [activeTab, setActiveTab] = useState<DetailTabType>('info');
const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
const nicknameInputRef = useRef<HTMLInputElement>(null);
```

## Event handler

이벤트 핸들러는 한 줄로 의도가 명확하면 expression body로 작성한다.

좋은 예:

```tsx
const handleChangeDetailTab = setActiveTab;
const handleBackClick = () => navigate(-1);
const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);
```

아래 경우에는 block body를 사용한다.

- 조건 분기가 있다.
- early return이 있다.
- side effect가 두 개 이상이다.
- 긴 객체 인자를 전달한다.
- async/await을 사용한다.

```tsx
const handleOpenModal = () => {
  push({
    id: MODAL_ID,
    component: <ConfirmModal />,
  });
};
```

## 짧은 조건문과 호출

한 줄로 읽히는 조건문은 포맷터 폭 안에서 한 줄로 작성한다.

```tsx
if (!bookDetail) return;
if (context?.previousDetail) queryClient.setQueryData(['books', 'detail', isbn13], context.previousDetail);
if (!profile) return <ProfileFallback />;
```

인자가 짧은 함수 호출도 포맷터 폭 안에서 한 줄로 작성한다. 객체 인자도 한 줄로 읽히면 한 줄로 둔다.

```tsx
addToast({ description: MSG_BOOK_DETAIL_WISHLIST_FAILED, type: 'error' });
const scrollContainerRef = useScrollRestoration<HTMLDivElement>({ isReady: bookDetail !== undefined });
```

조건 분기가 길거나, 인자가 길거나, side effect가 여러 개면 여러 줄로 작성한다. 함수 호출 자체를 한 줄로 유지하고 싶다면 긴 값은 미리 변수로 분리한다.

```tsx
const successMessage = isInterested ? MSG_DELETE_SUCCESS : MSG_ADD_SUCCESS;

addToast({ description: successMessage, type: 'success' });
```

## Derived render values

JSX에서 쓰는 파생값은 이벤트 핸들러 아래에 둔다.

단, `data`가 반드시 필요한 파생값은 loading/error/data 없음 early return 이후에 둔다.

```tsx
const trimmedNickname = nickname.trim();
const isSubmitDisabled = !trimmedNickname || isPending;

if (isProfileLoading) return <Loading fullscreen />;
if (!profile) return <ProfileFallback />;

const loginProviderLabel = LOGIN_PROVIDER_LABEL[profile.providers[0]];
```
