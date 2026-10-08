import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface PopularBookItem {
  rank: number;
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  coverUrl: string | null;
  description: string | null;
}

export interface PopularBooksResponse {
  items: PopularBookItem[];
  hideAdultContent: boolean;
}

export const getMostReadBooks = async () => {
  const response = await api.get<ApiSuccessResponse<PopularBooksResponse>>('/v2/discovery/most-read-books');
  return response.data.data;
};
