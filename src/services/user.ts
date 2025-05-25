import useAuthStore from 'stores/useAuthStore';

import { AgreementStatus, Authorization, MyPage, Terms, DrawType } from 'types/user';

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
