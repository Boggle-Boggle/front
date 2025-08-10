import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

import Bubble from './Bubble';

const LOGIN_TYPE = {
  kakao: { imgUrl: kakaoLogoImg },
  google: { imgUrl: googleLogoImg },
  apple: { imgUrl: appleLogoImg },
};

export type LoginType = typeof LOGIN_TYPE;

type LoginBtnProps = {
  type: keyof LoginType;
  isRecent: boolean;
};

const LoginBtn = ({ type, isRecent }: LoginBtnProps) => {
  const { imgUrl } = LOGIN_TYPE[type];

  const handleClick = async () => {
    window.location.href = `https://staging.api.bbaegok.store/backend/auth/oauth2/authorize?provider=${type}&redirect=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`;
  };

  return (
    <button
      className="relative flex flex-col items-center justify-center"
      type="button"
      aria-label={`${type}로그인`}
      onClick={handleClick}
    >
      <img src={imgUrl} alt="" className="size-[3.375rem] rounded-[50%] shadow-[0px_2px_10px_0px_#00000024]" />
      {isRecent && <Bubble />}
    </button>
  );
};

export default LoginBtn;
