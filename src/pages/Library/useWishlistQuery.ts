import type { PaginationMockResponse } from 'api.types';

import useInfiniteScroll from 'hooks/useInfiniteScroll';

import { getInterestedBooks, type InterestedBookItemResponse } from './api';
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
});

const getWishlistBooks = async (page: number, size = 15): Promise<PaginationMockResponse<MyBook[]>> => {
  const response = await getInterestedBooks({
    page,
    size,
  });

  return {
    pageNum: response.meta.page.page,
    totalResultCnt: response.meta.page.total,
    itemsPerPage: response.meta.page.size,
    items: response.data.items.map(convertInterestedBookToMyBook),
  };
};

export const useWishlistQuery = (enabled: boolean) => {
  return useInfiniteScroll<MyBook[]>(
    ['interested-books', 'library'],
    ({ pageParam, size }) => getWishlistBooks(pageParam, size),
    enabled,
  );
};
