import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

interface NicknameAvailabilityResponse {
  available: boolean;
}

export const getNicknameAvailability = async (nickname: string) => {
  const response = await api.get<ApiSuccessResponse<NicknameAvailabilityResponse>>('/v2/users/nickname/availability', {
    params: {
      nickname,
    },
  });

  return response.data.data.available;
};
