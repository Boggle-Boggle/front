import appleLogoImg from 'assets/logo/apple.png';
import googleLogoImg from 'assets/logo/google.png';
import kakaoLogoImg from 'assets/logo/kakao.png';

export const LOGIN_PROVIDER_LABEL = {
  GOOGLE: '구글',
  KAKAO: '카카오톡',
  APPLE: '애플',
} as const;

export type LoginProvider = keyof typeof LOGIN_PROVIDER_LABEL;

export const LOGIN_PROVIDER_LOGO_SRC: Record<LoginProvider, string> = {
  GOOGLE: googleLogoImg,
  KAKAO: kakaoLogoImg,
  APPLE: appleLogoImg,
};
