import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface UserSettings {
  hideAdultContent: boolean;
  recommendForMe: boolean;
}

export interface UpdateUserSettingsRequest {
  hideAdultContent?: boolean;
  recommendForMe?: boolean;
}

export const getUserSettings = async () => {
  const response = await api.get<ApiSuccessResponse<UserSettings>>('/v2/users/me/settings');

  return response.data.data;
};

export const updateUserSettings = async (params: UpdateUserSettingsRequest) => {
  const response = await api.patch<ApiSuccessResponse<UserSettings>>('/v2/users/me/settings', params);

  return response.data.data;
};
