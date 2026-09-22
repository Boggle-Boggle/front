import { useInfiniteQuery } from '@tanstack/react-query';

import type { PaginationMockResponse } from 'api.types';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { getInterestedBooks, type InterestedBookItemResponse, type InterestedBookSort } from './api';
import type { MyBook } from './useLibraryQuery';

const convertInterestedBookToMyBook = (book: InterestedBookItemResponse): MyBook => ({
  id: book.bookId,
  title: book.title,
  cover: book.coverUrl ?? '',
  isAdult: false,
  readingStatus: '읽음',
  rating: 0,
  readCount: 0,
  progress: 0,
  author: book.author,
  createdAt: book.createdAt,
  isbn13: book.isbn13,
});

const getWishlistBooks = async (
  page: number,
  searchKeyword: string,
  sortType: InterestedBookSort,
  size = 15,
): Promise<PaginationMockResponse<MyBook[]>> => {
  const response = await getInterestedBooks({
    q: searchKeyword.trim() || undefined,
    page,
    size,
    sort: sortType,
  });

  return {
    pageNum: response.meta.page.page,
    totalResultCnt: response.meta.page.total,
    itemsPerPage: response.meta.page.size,
    items: response.data.items.map(convertInterestedBookToMyBook),
  };
};

export const useWishlistQuery = (searchKeyword: string, sortType: InterestedBookSort, enabled: boolean) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['interested-books', 'library', searchKeyword.trim(), sortType],
    queryFn: ({ pageParam }) => getWishlistBooks(pageParam, searchKeyword, sortType, 15),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNum < Math.ceil(lastPage.totalResultCnt / lastPage.itemsPerPage)) {
        return lastPage.pageNum + 1;
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
