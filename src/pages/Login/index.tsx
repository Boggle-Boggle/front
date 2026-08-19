import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Highlight from 'components/Highlight';
import { IconHeadphone } from 'components/icons';

import loginImg from 'assets/img/login.png';
import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

import { STORAGE_KEY } from 'constants/storage';

import { getOAuthStartUrl } from './api';
import type { LoginProvider } from './api';
import { useGetMeQuery } from '../Auth/useGetMeQuery';

type LoginButtonItem = {
  provider: LoginProvider;
  logoSrc: string;
  alt: string;
};

const MSG_LOGIN_TITLE_MAIN = '빼곡하게 채우는';
const MSG_LOGIN_TITLE_SUB = '나만의 책장';
const MSG_LOGIN_SNS = 'SNS로 간편로그인';
const MSG_LOGIN_RECENT = '최근 로그인';
const MSG_LOGIN_HELP = '가입/로그인 오류 문의하기';

const getRecentLoginProvider = () => window.localStorage.getItem(STORAGE_KEY.RECENT_LOGIN_PROVIDER);

const LOGIN_BUTTON_ITEMS: LoginButtonItem[] = [
  {
    provider: 'kakao',
    logoSrc: kakaoLogoImg,
    alt: '카카오 로그인',
  },
  {
    provider: 'google',
    logoSrc: googleLogoImg,
    alt: '구글 로그인',
  },
  {
    provider: 'apple',
    logoSrc: appleLogoImg,
    alt: '애플 로그인',
  },
];

const Login = () => {
  const navigate = useNavigate();
  const recentLoginProvider = getRecentLoginProvider();

  const { isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleLogin = (provider: LoginProvider) => {
    window.localStorage.setItem(STORAGE_KEY.RECENT_LOGIN_PROVIDER, provider);
    window.location.replace(getOAuthStartUrl(provider));
  };

  return (
    <section className="relative flex h-dvh w-full flex-col justify-center gap-[30rem]">
      <header className="relative flex flex-col items-center text-neutral-80">
        <Highlight text={MSG_LOGIN_TITLE_MAIN} className="text-h3" />
        <h1 className="mt-1 text-h1">{MSG_LOGIN_TITLE_SUB}</h1>
        <img src={loginImg} alt="로그인 화면 일러스트" className="absolute top-24 z-background h-auto w-full" />
      </header>

      {/* SNS 로 간편로그인 */}
      <div className="z-book flex w-full flex-col items-center gap-6">
        <div className="flex w-full items-center gap-[1.1875rem] px-mobile">
          <span className="h-px flex-1 bg-neutral-60" />
          <span className="text-caption2 text-neutral-60">{MSG_LOGIN_SNS}</span>
          <span className="h-px flex-1 bg-neutral-60" />
        </div>

        {/* 로그인 */}
        <ul className="flex items-start justify-center gap-8">
          {LOGIN_BUTTON_ITEMS.map(({ provider, logoSrc, alt }) => {
            const isRecent = recentLoginProvider === provider;

            return (
              <li key={provider} className="relative flex flex-col items-center">
                {isRecent && (
                  <div className="absolute left-1/2 top-[calc(100%+0.625rem)] flex w-20 -translate-x-1/2 flex-col items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <div className="h-0 w-0 border-x-[0.375rem] border-b-[0.5625rem] border-x-transparent border-b-neutral-0" />
                    <div className="-mt-px flex h-9 w-full items-center justify-center rounded-lg bg-neutral-0 px-2 text-caption1 text-neutral-80">
                      {MSG_LOGIN_RECENT}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className="size-[3.375rem] rounded-full shadow-[0px_2px_10px_0px_rgba(0,0,0,0.14)]"
                  onClick={() => handleLogin(provider)}
                >
                  <img src={logoSrc} alt={alt} className="h-full w-full rounded-full object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 가입/로그인 오류 문의 */}
      <a
        href={import.meta.env.VITE_INQUIRY_GOOGLE_FORM_URL}
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+0.625rem)] left-1/2 flex -translate-x-1/2 items-center gap-0.5 text-caption2 text-neutral-60"
      >
        <IconHeadphone className="size-[1.125rem]" />
        {MSG_LOGIN_HELP}
      </a>
    </section>
  );
};

export default Login;
