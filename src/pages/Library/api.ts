import { api } from 'api';
import type { PaginatedResponse, PaginationParams } from 'api.types';

import type { AddRecordStatus } from 'pages/Records/shared/recordStatus';

export type ReadingLogStatus = 'ALL' | AddRecordStatus;

export type ReadingLogSort =
  | 'START_DATE_DESC'
  | 'START_DATE_ASC'
  | 'END_DATE_DESC'
  | 'END_DATE_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'CREATED_AT_DESC'
  | 'CREATED_AT_ASC';

export type ReadingLogProgressType = 'PERCENTAGE' | 'PAGE';

export interface GetReadingLogsParams extends PaginationParams {
  sort: ReadingLogSort;
  status: ReadingLogStatus;
  bookshelfId?: number;
  year?: number;
  month?: number;
}

interface ReadingLogBookResponse {
  title: string;
  author: string;
  coverUrl?: string | null;
  totalPages?: number | null;
  isAdult: boolean;
}

export interface ReadingLogListItemResponse {
  id: number;
  book: ReadingLogBookResponse;
  status: Exclude<ReadingLogStatus, 'ALL'>;
  rating?: number | null;
  progressType?: ReadingLogProgressType | null;
  progressValue?: number | null;
  progressPercentage?: number | null;
  startDate?: string | null;
  endDate?: string | null;
}

interface ReadingLogListResponse {
  items: ReadingLogListItemResponse[];
  hideAdultContent: boolean;
}

export const getLibraryReadingLogs = async (params: GetReadingLogsParams) => {
  const response = await api.get<PaginatedResponse<ReadingLogListResponse>>('/v2/reading-logs', {
    params,
  });

  return response.data;
};

export type GetInterestedBooksParams = PaginationParams;

export interface InterestedBookItemResponse {
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  coverUrl?: string | null;
  createdAt: string;
}

interface InterestedBookListResponse {
  items: InterestedBookItemResponse[];
  hideAdultContent: boolean;
}

export const getInterestedBooks = async (params: GetInterestedBooksParams) => {
  const response = await api.get<PaginatedResponse<InterestedBookListResponse>>('/v2/interested-books', {
    params,
  });

  return response.data;
};

export const deleteInterestedBook = async (bookId: number) => {
  await api.delete(`/v2/interested-books/${bookId}`);
};
