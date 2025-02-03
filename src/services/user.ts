import useAuthStore from 'stores/useAuthStore';

import { AgreementStatus, Authorization, MyPage, Terms } from 'types/user';

import api from '.';

export const getRefresh = async () => {
  const { login, logout } = useAuthStore.getState();

  try {
    const refreshResponse = await api.get('/auth/refresh');
    const newAccessToken: string = refreshResponse.data.data;

    login(newAccessToken);

    return newAccessToken;
  } catch (error) {
    logout();
    throw new Error('리프레시 토큰 갱신 실패');
  }
};

export const getAuthorization = async () => {
  const response = await api.get('/user/authorization');

  return response.data.data as Authorization;
};

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

export const deleteAccount = async () => {
  await api.delete('/user');
};
