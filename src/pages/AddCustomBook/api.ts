import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { AddRecordStatus, CustomBookDto, ReadingLogProgressType } from 'types';

export interface ReadingLogDto {
  status: AddRecordStatus;
  rating?: number;
  startDate?: string;
  endDate?: string;
  progressType?: ReadingLogProgressType;
  progressValue?: number;
  bookshelfIds: number[];
  isHidden: boolean;
}

export interface SaveCustomReadingLogRequest {
  book: CustomBookDto;
  readingLog: ReadingLogDto;
}

export interface SaveCustomReadingLogResponse {
  id: number;
}

export const createCustomReadingLog = async (params: SaveCustomReadingLogRequest) => {
  const response = await api.post<ApiSuccessResponse<SaveCustomReadingLogResponse>>(
    '/v2/reading-logs/with-custom-book',
    params,
  );
  return response.data.data;
};
