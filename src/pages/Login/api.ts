const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export type LoginProvider = 'kakao' | 'google' | 'apple';

export const getOAuthStartUrl = (provider: LoginProvider) => {
  const oauthStartUrl = new URL(`/v2/auth/oauth/${provider}/start`, API_BASE_URL);

  oauthStartUrl.searchParams.set('returnUrl', new URL('/auth', window.location.origin).toString());

  return oauthStartUrl.toString();
};
