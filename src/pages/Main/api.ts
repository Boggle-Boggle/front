import { api } from 'api';
import type { PaginatedResponse, PaginationParams } from 'api.types';

type ReadingLogStatus = 'ALL' | 'READING' | 'COMPLETED' | 'DROPPED';

type ReadingLogSort =
  | 'START_DATE_DESC'
  | 'START_DATE_ASC'
  | 'END_DATE_DESC'
  | 'END_DATE_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'CREATED_AT_DESC'
  | 'CREATED_AT_ASC';

interface GetReadingLogsParams extends PaginationParams {
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
}

interface ReadingLogListItemResponse {
  id: number;
  book: ReadingLogBookResponse;
  status: Exclude<ReadingLogStatus, 'ALL'>;
  rating?: number | null;
  progressType?: 'PERCENTAGE' | 'PAGE' | null;
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
