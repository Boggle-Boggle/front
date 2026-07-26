import type { PaginationMockResponse } from 'api.types';

import useInfiniteScroll from 'hooks/useInfiniteScroll';

import {
  getLibraryReadingLogs,
  type ReadingLogListItemResponse,
  type ReadingLogSort,
  type ReadingLogStatus,
} from './api';

export type ReadingStatus = '읽는중' | '읽음' | '중단';

export type MyBook = {
  id: number;
  title: string;
  cover: string;
  isAdult: boolean;
  readingStatus: ReadingStatus;
  rating: number;
  readCount: number;
  progress: number;
  author?: string;
  createdAt?: string;
};

const READING_STATUS_BY_API_STATUS: Record<Exclude<ReadingLogStatus, 'ALL'>, ReadingStatus> = {
  COMPLETED: '읽음',
  DROPPED: '중단',
  READING: '읽는중',
};

const getProgressPercentage = (readingLog: ReadingLogListItemResponse) => {
  if (typeof readingLog.progressPercentage === 'number') return readingLog.progressPercentage;
  if (readingLog.status === 'COMPLETED') return 100;

  return 0;
};

const convertReadingLogToMyBook = (readingLog: ReadingLogListItemResponse): MyBook => ({
  id: readingLog.id,
  title: readingLog.book.title,
  cover: readingLog.book.coverUrl ?? '',
  isAdult: readingLog.book.isAdult,
  readingStatus: READING_STATUS_BY_API_STATUS[readingLog.status],
  rating: readingLog.rating ?? 0,
  readCount: 0,
  progress: getProgressPercentage(readingLog),
});

const getLibraryBooks = async (
  page: number,
  sortType: ReadingLogSort,
  readingFilter: ReadingLogStatus,
  size = 15,
  bookshelfId?: number,
): Promise<PaginationMockResponse<MyBook[]>> => {
  const response = await getLibraryReadingLogs({
    page,
    size,
    sort: sortType,
    status: readingFilter,
    bookshelfId,
  });

  return {
    pageNum: response.meta.page.page,
    totalResultCnt: response.meta.page.total,
    itemsPerPage: response.meta.page.size,
    items: response.data.items.map(convertReadingLogToMyBook),
  };
};

export const useLibraryQuery = (
  sortType: ReadingLogSort,
  readingFilter: ReadingLogStatus,
  bookshelfId?: number,
  enabled = true,
) => {
  return useInfiniteScroll<MyBook[]>(
    ['reading-logs', 'library', sortType, readingFilter, bookshelfId],
    ({ pageParam, size }) => getLibraryBooks(pageParam, sortType, readingFilter, size, bookshelfId),
    enabled,
  );
};
