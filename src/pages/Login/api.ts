const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const AUTH_RETURN_URL = import.meta.env.VITE_AUTH_RETURN_URL;

export type LoginProvider = 'kakao' | 'google' | 'apple';

export const getOAuthStartUrl = (provider: LoginProvider) => {
  const oauthStartUrl = new URL(`/v2/auth/oauth/${provider}/start`, API_BASE_URL);

  oauthStartUrl.searchParams.set('returnUrl', AUTH_RETURN_URL);

  return oauthStartUrl.toString();
};
