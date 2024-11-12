import { PaginationResponse } from 'types/api';
import { Book, BookDetail } from 'types/book';

import api from '.';

export const getSearchBooks = async (query: string, page: number) => {
  const response = await api.get(`/books?query=${query}&pageNum=${page}`);

  return response.data.data as PaginationResponse<Book[]>;
};

export const getBookDetail = async (isbn: string) => {
  const response = await api.get(`/books/${isbn}`);

  return response.data.data as BookDetail;
};
