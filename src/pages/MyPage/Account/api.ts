import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export const createLogout = async () => {
  await api.post<void>('/v2/auth/logout');
};

export type WithdrawalReasonCode =
  | 'UNINTUITIVE_UX'
  | 'POOR_VISUAL'
  | 'NOT_MUCH_READING'
  | 'TOO_MANY_FEATURES'
  | 'MISSING_BOOKS'
  | 'OTHER'
  | 'NO_RESPONSE';

export interface WithdrawalReasonItem {
  code: WithdrawalReasonCode;
  label: string;
}

interface GetWithdrawalReasonsResponse {
  reasons: WithdrawalReasonItem[];
}

export const getWithdrawalReasons = async () => {
  const response = await api.get<ApiSuccessResponse<GetWithdrawalReasonsResponse>>('/v2/users/me/withdrawal-reasons');

  return response.data.data.reasons;
};

interface DeleteMeRequest {
  reason: WithdrawalReasonCode;
  customText?: string;
}

export const deleteMe = async (params: DeleteMeRequest) => {
  await api.delete<void>('/v2/users/me', {
    data: params,
  });
};
