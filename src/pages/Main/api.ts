import { api } from 'api';
import type { PaginatedResponse, PaginationParams } from 'api.types';

import type { Book, Nullable, ReadingLogProgressType, ReadingLogStatus } from 'types';

type ReadingLogSort =
  | 'START_DATE_DESC'
  | 'START_DATE_ASC'
  | 'END_DATE_DESC'
  | 'END_DATE_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'CREATED_AT_DESC'
  | 'CREATED_AT_ASC';

export interface GetReadingLogsParams extends PaginationParams {
  sort: ReadingLogSort;
  status: ReadingLogStatus;
  bookshelfId?: number;
  year?: number;
  month?: number;
}

type ReadingLogBookResponse = Pick<Book, 'title' | 'author' | 'coverUrl' | 'totalPages'>;

interface ReadingLogListItemResponse {
  id: number;
  book: ReadingLogBookResponse;
  status: Exclude<ReadingLogStatus, 'ALL'>;
  rating?: number | null;
  progressType?: Nullable<ReadingLogProgressType>;
  progressValue?: number | null;
  progressPercentage?: number | null;
  startDate?: string | null;
  endDate?: string | null;
}

interface ReadingLogListResponse {
  items: ReadingLogListItemResponse[];
  hideAdultContent: boolean;
}

export const getReadingLogs = async (params: GetReadingLogsParams) => {
  const response = await api.get<PaginatedResponse<ReadingLogListResponse>>('/v2/reading-logs', {
    params,
  });

  return response.data;
};
