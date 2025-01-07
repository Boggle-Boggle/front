const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const LOGIN_TYPE = {
  kakao: {
    title: '카카오',
    imgUrl: `${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/logo/kakao.png`,
    redirect: `/oauth2/authorization/kakao?redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`,
  },
  google: {
    title: '구글',
    imgUrl: `${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/logo/google.png`,
    redirect: '',
  },
  apple: {
    title: '애플',
    imgUrl: `${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/logo/apple.png`,
    redirect: '',
  },
};

type LoginType = typeof LOGIN_TYPE;

type LoginBtnProps = {
  type: keyof LoginType;
};

const LoginBtn = ({ type }: LoginBtnProps) => {
  const { title, redirect, imgUrl } = LOGIN_TYPE[type];

  const handleClick = () => {
    window.location.href = baseUrl + redirect;
  };

  return (
    <button type="button" className="h-12 w-12" aria-label={`${title}로그인`} onClick={handleClick}>
      <img src={imgUrl} alt="" className="h-full w-full rounded-[50%] bg-white shadow-xl" />
    </button>
  );
};

export default LoginBtn;
