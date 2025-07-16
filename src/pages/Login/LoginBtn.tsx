import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

import Bubble from './Bubble';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const LOGIN_TYPE = {
  kakao: {
    title: '카카오',
    imgUrl: kakaoLogoImg,
    redirectUrl: `/oauth2/authorization/kakao?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  },
  google: {
    title: '구글',
    imgUrl: googleLogoImg,
    redirectUrl: `/oauth2/authorization/google?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  },
  apple: {
    title: '애플',
    imgUrl: appleLogoImg,
    redirectUrl: `/oauth2/apple?redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  },
};

export type LoginType = typeof LOGIN_TYPE;

type LoginBtnProps = {
  type: keyof LoginType;
  isRecent: boolean;
  // setIsLoading: (isLoading: boolean) => void;
};

const LoginBtn = ({ type, isRecent }: LoginBtnProps) => {
  const { title, redirectUrl, imgUrl } = LOGIN_TYPE[type];

  const handleClick = () => {
    // setIsLoading(true);
    window.location.href = baseUrl + redirectUrl;
  };

  return (
    <button
      className="relative flex flex-col items-center justify-center"
      type="button"
      aria-label={`${title}로그인`}
      onClick={handleClick}
    >
      <img src={imgUrl} alt="" className="size-[3.375rem] rounded-[50%] shadow-[0px_2px_10px_0px_#00000024]" />
      {isRecent && <Bubble />}
    </button>
  );
};

export default LoginBtn;
