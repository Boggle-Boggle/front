import { PaginationResponse, Response } from 'types/api';
import { Book, BookDetail } from 'types/book';

import { api } from 'services/index';

export const getSearchBooks = async (query: string, page: number) => {
  const response = await api.get<Response<PaginationResponse<Book[]>>>(`/books?query=${query}&pageNum=${page}`);

  return response.data;
};

export const getBookDetail = async (isbn: string) => {
  const response = await api.get<Response<BookDetail>>(`/books/${isbn}`);

  return response.data;
};

export const hasReadingRecord = async (isbn: string) => {
  const response = await api.get<Response<null | number>>(`/reading-record/isbn/${isbn}`);

  return response.data;
};

export const getSearchHistories = async () => {
  const response = await api.get<Response<string[]>>('/recent-searches');

  return response.data;
};

export const addSearchHistory = async (title: string) => {
  await api.post('/recent-searches', { keyword: title });
};

export const removeSearchHistory = async (history: string) => {
  await api.delete('/recent-searches', { data: { keyword: history } });
};

export const removeAllSearchHistory = async () => {
  await api.delete('/recent-searches/all');
};
