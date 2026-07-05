export const LOGIN_PROVIDER_LABEL = {
  GOOGLE: '구글',
  KAKAO: '카카오톡',
  APPLE: '애플',
} as const;

export type LoginProvider = keyof typeof LOGIN_PROVIDER_LABEL;
