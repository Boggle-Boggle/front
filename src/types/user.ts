import DRAW_TYPE_LIST from 'constants/user';

export type Terms = {
  version: string;
  terms: Term[];
};

export type Term = {
  id: number;
  title: string;
  content: string;
  mandatory: boolean;
  agree: boolean;
};

export type AgreementStatus = {
  id: number;
  isAgree: boolean;
};

export type TermWithAgree = Term & { isAgree: boolean };

export type MyPage = {
  nickname: string;
  totalReadingCnt: number;
  monthlyReadingCnt: number;
  totalNote: number;
};

export type Authorization = 'GUEST' | 'USER' | 'LIMITED_USER';

export type DrawType = (typeof DRAW_TYPE_LIST)[number];
