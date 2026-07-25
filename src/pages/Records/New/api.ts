import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { BookMediaType } from 'pages/BookDetail/api';

import type { AddRecordStatus } from '../shared/recordStatus';

export interface CreateReadingLogRequest {
  isbn13: string;
  mediaType: BookMediaType;
  status: AddRecordStatus;
  rating: number;
  startDate: string;
  endDate: string;
  progressType?: 'PAGE' | 'PERCENTAGE';
  progressValue?: number;
  totalPagesOverride?: number;
  bookshelfIds: number[];
  isHidden: boolean;
}

interface CreateReadingLogResponse {
  id: number;
}

export const createReadingLog = async (params: CreateReadingLogRequest) => {
  const response = await api.post<ApiSuccessResponse<CreateReadingLogResponse>>('/v2/reading-logs', params);

  return response.data.data;
};
