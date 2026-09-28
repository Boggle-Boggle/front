import { useInfiniteQuery } from '@tanstack/react-query';

import type { PaginatedResponse } from 'api.types';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { READING_STATUS_LABEL_BY_CODE, type ReadingLogStatus, type ReadingStatusLabel } from 'types';

import { getLibraryReadingLogs, type ReadingLogListItemResponse, type ReadingLogSort } from './api';

export type MyBook = {
  id: number;
  title: string;
  cover: string;
  isAdult: boolean;
  readingStatus: ReadingStatusLabel;
  rating: number;
  readCount: number;
  progress: number;
  author?: string;
  createdAt?: string;
  startDate?: string | null;
  endDate?: string | null;
  isbn13?: string;
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
  readingStatus: READING_STATUS_LABEL_BY_CODE[readingLog.status],
  rating: readingLog.rating ?? 0,
  readCount: 0,
  progress: getProgressPercentage(readingLog),
  author: readingLog.book.author,
  startDate: readingLog.startDate,
  endDate: readingLog.endDate,
  isbn13: readingLog.book.isbn13,
});

const getLibraryBooks = async (
  page: number,
  sortType: ReadingLogSort,
  readingFilter: ReadingLogStatus,
  size = 15,
  bookshelfId?: number,
): Promise<PaginatedResponse<{ items: MyBook[] }>> => {
  const response = await getLibraryReadingLogs({
    page,
    size,
    sort: sortType,
    status: readingFilter,
    bookshelfId,
  });

  return {
    ...response,
    data: {
      items: response.data.items.map(convertReadingLogToMyBook),
    },
  };
};

export const useLibraryQuery = (
  sortType: ReadingLogSort,
  readingFilter: ReadingLogStatus,
  bookshelfId?: number,
  enabled = true,
) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['reading-logs', 'library', sortType, readingFilter, bookshelfId],
    queryFn: ({ pageParam }) => getLibraryBooks(pageParam, sortType, readingFilter, 15, bookshelfId),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page.page < Math.ceil(lastPage.meta.page.total / lastPage.meta.page.size)) {
        return lastPage.meta.page.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
  });

  const { observerTarget } = useInfiniteScrollObserver({
    enabled: Boolean(queryResult.hasNextPage && !queryResult.isFetchingNextPage && enabled),
    onIntersect: queryResult.fetchNextPage,
  });

  return {
    ...queryResult,
    observerTarget,
  };
};
