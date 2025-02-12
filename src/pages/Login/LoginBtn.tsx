import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const LOGIN_TYPE = {
  kakao: {
    title: '카카오',
    imgUrl: kakaoLogoImg,
    redirect: `/oauth2/authorization/kakao?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  },
  google: {
    title: '구글',
    imgUrl: googleLogoImg,
    redirect: `/oauth2/authorization/google?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  },
  apple: {
    title: '애플',
    imgUrl: appleLogoImg,
    redirect: `/oauth2/apple?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
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
    <button type="button" aria-label={`${title}로그인`} onClick={handleClick}>
      <img src={imgUrl} alt="" className="h-12 w-12 rounded-[50%] shadow-xl" />
    </button>
  );
};

export default LoginBtn;
