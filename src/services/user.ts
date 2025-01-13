import { AgreementStatus, MyPage, Terms } from 'types/user';

import api from '.';

export const isDuplicateNickname = async (nickname: string) => {
  const response = await api.get(`/user/nickname?nickname=${nickname}`);

  return !response.data.data as boolean;
};

export const updateNickname = async (nickname: string) => {
  await api.patch('/user/nickname', { nickname });
};

export const getTermsAgreement = async () => {
  const response = await api.get('/user/terms');

  return response.data.data as Terms;
};

export const agreeTerms = async (terms: AgreementStatus[]) => {
  await api.put('/user/terms', terms);
};

export const getMyPageInfo = async () => {
  const response = await api.get('/mypage');

  return response.data.data as MyPage;
};
