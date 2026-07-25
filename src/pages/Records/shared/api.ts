import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export const BOOKSHELVES_QUERY_KEY = ['bookshelves'];

export interface BookshelfItem {
  id: number;
  name: string;
}

interface BookshelvesResponse {
  items: BookshelfItem[];
}

export const getBookshelves = async () => {
  const response = await api.get<ApiSuccessResponse<BookshelvesResponse>>('/v2/bookshelves');

  return response.data.data.items;
};

interface CreateBookshelfRequest {
  name: string;
}

export const createBookshelf = async (params: CreateBookshelfRequest) => {
  const response = await api.post<ApiSuccessResponse<BookshelfItem>>('/v2/bookshelves', params);

  return response.data.data;
};

export const deleteBookshelf = async (bookshelfId: number) => {
  await api.delete(`/v2/bookshelves/${bookshelfId}`);
};
