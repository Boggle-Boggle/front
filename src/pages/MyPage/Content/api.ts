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

export interface BlockItem {
  userId: number;
  nickname: string;
  blockedAt: string;
}

export interface BlockListResponse {
  items: BlockItem[];
}

export const getUserSettings = async () => {
  const response = await api.get<ApiSuccessResponse<UserSettings>>('/v2/users/me/settings');

  return response.data.data;
};

export const updateUserSettings = async (params: UpdateUserSettingsRequest) => {
  const response = await api.patch<ApiSuccessResponse<UserSettings>>('/v2/users/me/settings', params);

  return response.data.data;
};

export const getMyBlocks = async (page?: number, size?: number) => {
  const response = await api.get<ApiSuccessResponse<BlockListResponse>>('/v2/users/me/blocks', {
    params: { page, size },
  });

  return response.data.data;
};

export const unblockUser = async (userId: number) => {
  const response = await api.delete<ApiSuccessResponse<null>>(`/v2/users/${userId}/block`);

  return response.data.data;
};

