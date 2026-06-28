import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

interface MeResponse {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  roles: string[];
  createdAt: string;
}

export const getMe = async () => {
  const response = await api.get<ApiSuccessResponse<MeResponse>>('/v2/users/me');

  return response.data.data;
};
