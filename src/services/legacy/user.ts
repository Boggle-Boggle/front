import useAuthStore from 'stores/useAuthStore';

import { Response } from 'types/api';
import { AgreementStatus, Authorization, MyPage, Terms, DrawType } from 'types/user';

import { api } from 'services/index';

export const getAuthorization = async () => {
  const response = await api.get<Response<Authorization>>('/user/authorization');

  return response.data;
};

export const isDuplicateNickname = async (nickname: string) => {
  const response = await api.get<Response<boolean>>(`/user/nickname?nickname=${nickname}`);

  return !response.data;
};

export const updateNickname = async (nickname: string) => {
  await api.patch('/user/nickname', { nickname });
};

export const getTermsAgreement = async () => {
  const response = await api.get<Response<Terms>>('/user/terms');

  return response.data;
};

export const agreeTerms = async (terms: AgreementStatus[]) => {
  await api.put('/user/terms', terms);
};

export const getMyPageInfo = async () => {
  const response = await api.get<Response<MyPage>>('/mypage');

  return response.data;
};

export const deleteAccount = async (type: DrawType, withdrawText: string | null) => {
  let withdrawType = '';

  switch (type) {
    case '개인정보 및 보안이 우려돼요':
      withdrawType = 'PRIVACY_CONCERN';
      break;
    case '서비스 장애와 오류가 있어요':
      withdrawType = 'SERVICE_ERROR';
      break;
    case '탈퇴 후 신규가입 할 거예요':
      withdrawType = 'REJOIN_AFTER_WITHDRAWAL';
      break;
    case '원하는 기능이 부족해요':
      withdrawType = 'LACK_OF_FEATURES';
      break;
    case '사용하기 불편해요':
      withdrawType = 'BAD_UI_UX';
      break;
    case '더 이상 독서기록이 필요하지 않아요':
      withdrawType = 'NO_LONGER_NEEDED';
      break;
    case '기타':
      withdrawType = 'ETC';
      break;

    default:
      return;
  }

  await api.delete('/user', { data: { withdrawType, withdrawText } });
};

// refactor

type RefreshType = {
  accessToken: string;
};

export const refreshToken = async () => {
  const { login, logout } = useAuthStore.getState();

  try {
    const refreshResponse = await api.get<RefreshType>('/auth/refresh');
    if (!refreshResponse.data) return;

    const { accessToken } = refreshResponse.data;

    login(accessToken);
  } catch (error) {
    logout();
    throw new Error('리프레시 토큰 갱신 실패');
  }
};

export const getTerms = async () => {
  const response = await api.get<Terms>('/terms');

  return response.data?.terms;
};

type SignUpParams = {
  nickname: string;
  agreements: AgreementStatus[];
};
export const signUp = async (params: SignUpParams) => {
  await api.post('/auth/signup', params);
};
