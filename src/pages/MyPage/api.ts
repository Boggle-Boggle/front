import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

type LoginProvider = 'GOOGLE' | 'KAKAO' | 'APPLE';

export interface MyPageProfileResponse {
  nickname: string;
  providers: LoginProvider[];
  totalReadCount: number;
  thisYearReadCount: number;
  totalNoteCount: number;
}

export const getMyPageProfile = async () => {
  const response = await api.get<ApiSuccessResponse<MyPageProfileResponse>>('/v2/users/me/profile');

  return response.data.data;
};
