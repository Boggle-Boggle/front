import type { PaginationMockResponse } from 'api.types';

import useInfiniteScroll from 'hooks/useInfiniteScroll';

export type TrendingBook = {
  id: number;
  title: string;
  author: string;
  cover: string;
};

const BOOK_COVER_URL = 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/filters:format(webp)/pdt/9788936434120.jpg';

const MOCK_TRENDING_BOOKS: TrendingBook[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `요즘 주목받고 있는 책 ${index + 1}`,
  author: `작가 ${index + 1}`,
  cover: BOOK_COVER_URL,
}));

const getTrendingBooksMock = async (page: number): Promise<PaginationMockResponse<TrendingBook[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itemsPerPage = 20;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedBooks = MOCK_TRENDING_BOOKS.slice(start, end);

      resolve({
        pageNum: page,
        totalResultCnt: MOCK_TRENDING_BOOKS.length,
        itemsPerPage,
        items: paginatedBooks,
      });
    }, 300);
  });
};

export const useTrendingBooksQuery = () => {
  return useInfiniteScroll<TrendingBook[]>(
    ['books', 'trending'],
    ({ pageParam = 1 }) => getTrendingBooksMock(pageParam),
    true,
  );
};
