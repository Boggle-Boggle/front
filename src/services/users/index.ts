import { api } from 'api';

import { ApiResponse } from 'types/api';
import { Me, NicknameAvailability } from 'types/auth';

export const getMe = async () => {
  const response = await api.get<ApiResponse<Me>, ApiResponse<Me>>('/v2/users/me');
  return response.data;
};

export const getNicknameAvailability = async (nickname: string) => {
  const response = await api.get<ApiResponse<NicknameAvailability>, ApiResponse<NicknameAvailability>>(
    '/v2/users/nickname/availability',
    {
      params: {
        nickname,
      },
    },
  );

  return response.data;
};
