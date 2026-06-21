import type { PaginationResponse } from 'api.types';

import { Book } from 'types/book';

const MOCK_BOOKS: Book[] = Array.from({ length: 50 }, (_, i) => ({
  isbn: `mock-isbn-${i + 1}`,
  title: `Mock Book Title ${i + 1}`,
  author: `Mock Author ${i + 1}`,
  publisher: `Mock Publisher ${i + 1}`,
  pubDate: '2023-01-01',
  cover: 'https://image.aladin.co.kr/product/38242/41/cover500/k462034622_2.jpg',
}));

export const getSearchBooksMock = async (query: string, page: number): Promise<PaginationResponse<Book[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itemsPerPage = 10;
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedBooks = MOCK_BOOKS.slice(start, end);

      resolve({
        pageNum: page,
        totalResultCnt: MOCK_BOOKS.length,
        itemsPerPage,
        items: paginatedBooks,
      });
    }, 500);
  });
};

export const hasReadingRecordMock = async (isbn: string): Promise<number | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isRegistered = parseInt(isbn.split('-')[2], 10) % 2 !== 0;
      resolve(isRegistered ? 123 : null);
    }, 200);
  });
};
