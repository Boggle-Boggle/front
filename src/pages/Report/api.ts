import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export const REPORT_REASONS_INFO = [
  { type: 'INAPPROPRIATE_LANGUAGE', label: '부적절한 언어를 사용하였습니다' },
  { type: 'UNRELATED_CONTENT', label: '작품과 관련 없는 내용입니다' },
  { type: 'SPAM_OR_ADVERTISEMENT', label: '스팸 또는 광고입니다' },
  { type: 'FALSE_INFORMATION', label: '허위정보 또는 악의적인 평점 조작을 하였습니다' },
  { type: 'EXCESSIVE_SPOILER', label: '과한 스포일러 요소가 있습니다' },
  { type: 'HARASSMENT_OR_DEFAMATION', label: '누군가를 괴롭힘/명예훼손 하고 있습니다' },
  { type: 'NICKNAME_VIOLATION', label: '닉네임 규정을 위반하였습니다' },
  { type: 'OTHER', label: '기타' },
] as const;

export type ReviewReportReasonType = typeof REPORT_REASONS_INFO[number]['type'];

export interface ReviewReportRequest {
  reason: ReviewReportReasonType;
  customReason?: string;
}

export const reportReview = async (params: { reviewId: number; body: ReviewReportRequest }) => {
  const { reviewId, body } = params;
  const response = await api.post<ApiSuccessResponse<null>>(`/v2/reviews/${reviewId}/report`, body);

  return response.data.data;
};

export const blockUserInReport = async (userId: number) => {
  const response = await api.post<ApiSuccessResponse<null>>(`/v2/users/${userId}/block`);

  return response.data.data;
};
