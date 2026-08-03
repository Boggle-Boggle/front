import { api } from 'api';
import type { PaginatedResponse, PaginationParams, ApiSuccessResponse } from 'api.types';

import type { Book, Nullable, ReadingLogProgressType, ReadingLogStatus } from 'types';

export type ReadingLogSort =
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

type ReadingLogBookResponse = Pick<Book, 'title' | 'author' | 'coverUrl' | 'totalPages' | 'isAdult'>;

export interface ReadingLogListItemResponse {
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

export const getLibraryReadingLogs = async (params: GetReadingLogsParams) => {
  const response = await api.get<PaginatedResponse<ReadingLogListResponse>>('/v2/reading-logs', {
    params,
  });

  return response.data;
};

export type GetInterestedBooksParams = PaginationParams;

export type InterestedBookItemResponse = Pick<Book, 'isbn13' | 'title' | 'author' | 'coverUrl'> & {
  bookId: number;
  createdAt: string;
};

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

export interface BookshelfItemResponse {
  id: number;
  name: string;
}

interface GetBookshelvesResponse {
  items: BookshelfItemResponse[];
}

export const getBookshelves = async () => {
  const response = await api.get<ApiSuccessResponse<GetBookshelvesResponse>>('/v2/bookshelves');

  return response.data.data.items;
};

export interface CreateBookshelfRequest {
  name: string;
}

export const createBookshelf = async (params: CreateBookshelfRequest) => {
  const response = await api.post<ApiSuccessResponse<BookshelfItemResponse>>('/v2/bookshelves', params);

  return response.data.data;
};
