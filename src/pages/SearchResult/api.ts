import { api } from 'api';
import type { PaginatedResponse, PaginationParams } from 'api.types';

export type SearchMediaType = 'BOOK' | 'EBOOK';

interface GetSearchBooksParams extends Omit<PaginationParams, 'size'> {
  query: string;
  type: SearchMediaType;
}

export interface SearchBook {
  isbn13: string;
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  coverUrl: string | null;
  description: string | null;
  category: string;
  mediaType: SearchMediaType;
  isAdult: boolean;
}

interface SearchBooksResponse {
  items: SearchBook[];
  hideAdultContent: boolean;
}

export const getSearchBooks = async (params: GetSearchBooksParams) => {
  const response = await api.get<PaginatedResponse<SearchBooksResponse>>('/v2/books/search', {
    params,
  });

  return response.data;
};
