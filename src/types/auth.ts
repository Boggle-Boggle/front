export type AuthProvider = 'google' | 'kakao' | 'apple';

export type AuthStatus = 'EXISTING_USER' | 'SIGNUP_REQUIRED' | 'ERROR';

export type Me = {
  createdAt: string;
  id: number;
  nickname: string;
  profileImageUrl?: string;
  roles: string[];
};

export type TermResponse = {
  body: string;
  code: string;
  required: boolean;
  termsId: number;
  title: string;
  version: number;
};

export type Term = Omit<TermResponse, 'termsId'> & {
  effectiveAt: string;
  id: number;
};

export type LatestTermsResponse = {
  items: TermResponse[];
};

export type NicknameAvailability = {
  available: boolean;
};

export type CompleteSignupPayload = {
  agreements: {
    agreed: boolean;
    termsId: number;
  }[];
  nickname: string;
};
