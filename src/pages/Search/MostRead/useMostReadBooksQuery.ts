import type { PaginationResponse } from 'api.types';

import useInfiniteScroll from 'hooks/useInfiniteScroll';

export type MostReadBook = {
  id: number;
  title: string;
  author: string;
  cover: string;
};

const BOOK_COVER_URL = 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/filters:format(webp)/pdt/9791170613343.jpg';

const MOCK_MOST_READ_BOOKS: MostReadBook[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `가장 많이 읽힌 책 ${index + 1}`,
  author: `작가 ${index + 1}`,
  cover: BOOK_COVER_URL,
}));

const getMostReadBooksMock = async (page: number): Promise<PaginationResponse<MostReadBook[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itemsPerPage = 20;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedBooks = MOCK_MOST_READ_BOOKS.slice(start, end);

      resolve({
        pageNum: page,
        totalResultCnt: MOCK_MOST_READ_BOOKS.length,
        itemsPerPage,
        items: paginatedBooks,
      });
    }, 300);
  });
};

export const useMostReadBooksQuery = () => {
  return useInfiniteScroll<MostReadBook[]>(
    ['books', 'mostRead'],
    ({ pageParam = 1 }) => getMostReadBooksMock(pageParam),
    true,
  );
};
