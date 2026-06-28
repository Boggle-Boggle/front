import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Highlight from 'components/Highlight';
import { IconHeadphone } from 'components/icons';

import loginImg from 'assets/img/login.png';
import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

import { getOAuthStartUrl } from './api';
import type { LoginProvider } from './api';
import { getMe } from '../Auth/api';

type LoginButtonItem = {
  provider: LoginProvider;
  logoSrc: string;
  alt: string;
  isRecent: boolean;
};

const MSG_LOGIN_TITLE_MAIN = '빼곡하게 채우는';
const MSG_LOGIN_TITLE_SUB = '나만의 책장';
const MSG_LOGIN_SNS = 'SNS로 간편로그인';
// const MSG_LOGIN_RECENT = '최근 로그인';
const MSG_LOGIN_HELP = '가입/로그인 오류 문의하기';

const LOGIN_BUTTON_ITEMS: LoginButtonItem[] = [
  {
    provider: 'kakao',
    logoSrc: kakaoLogoImg,
    alt: '카카오 로그인',
    isRecent: true,
  },
  {
    provider: 'google',
    logoSrc: googleLogoImg,
    alt: '구글 로그인',
    isRecent: false,
  },
  {
    provider: 'apple',
    logoSrc: appleLogoImg,
    alt: '애플 로그인',
    isRecent: false,
  },
];

const Login = () => {
  const navigate = useNavigate();

  const { isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleLogin = (provider: LoginProvider) => {
    window.location.href = getOAuthStartUrl(provider);
  };

  return (
    <section className="relative flex h-dvh w-full flex-col justify-center gap-[35rem]">
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
            return (
              <li key={provider} className="relative flex flex-col items-center">
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
