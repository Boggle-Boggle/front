import { PaginationResponse } from 'types/api';
import { Book, BookDetail, SearchHistory } from 'types/book';

import api from '.';

export const getSearchBooks = async (query: string, page: number) => {
  const response = await api.get(`/books?query=${query}&pageNum=${page}`);

  return response.data.data as PaginationResponse<Book[]>;
};

export const getBookDetail = async (isbn: string) => {
  const response = await api.get(`/books/${isbn}`);

  return response.data.data as BookDetail;
};

export const hasReadingRecord = async (isbn: string) => {
  const response = await api.get(`/reading-record/isbn/${isbn}`);

  return response.data.data as null | number;
};

export const getSearchHistories = async () => {
  const response = await api.get('/recent-searches');

  return response.data.data as SearchHistory[];
};

export const addSearchHistory = async (title: string) => {
  await api.post('/recent-searches', { keyword: title });
};

export const removeSearchHistory = async (history: SearchHistory) => {
  await api.delete('/recent-searches', { data: history });
};

export const removeAllSearchHistory = async () => {
  await api.delete('/recent-searches/all');
};
