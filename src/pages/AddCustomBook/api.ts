import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { AddRecordStatus, BookSource, CustomBookDto, ReadingLogProgressType } from 'types';

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

export interface UpdateCustomBookRequest {
  title: string;
  author: string;
  mediaType: CustomBookDto['mediaType'];
  publisher?: string | null;
  isbn?: string | null;
  totalPages?: number | null;
  coverUrl?: string | null;
  description?: string | null;
}

export interface CustomBookResponse extends UpdateCustomBookRequest {
  id: number;
  source: Extract<BookSource, 'CUSTOM'>;
}

export const createCustomReadingLog = async (params: SaveCustomReadingLogRequest) => {
  const response = await api.post<ApiSuccessResponse<SaveCustomReadingLogResponse>>(
    '/v2/reading-logs/with-custom-book',
    params,
  );
  return response.data.data;
};

export const updateCustomBook = async (bookId: string | number, params: UpdateCustomBookRequest) => {
  const response = await api.put<ApiSuccessResponse<CustomBookResponse>>(`/v2/books/custom/${bookId}`, params);
  return response.data.data;
};
