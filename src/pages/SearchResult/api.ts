import { api } from 'api';
import type { PaginatedResponse, PaginationParams } from 'api.types';

export type SearchMediaType = 'BOOK' | 'EBOOK';

interface GetSearchBooksParams extends PaginationParams {
  query: string;
  type: SearchMediaType;
}

interface SearchBookItemResponse {
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
}

interface SearchBooksResponse {
  items: SearchBookItemResponse[];
  hideAdultContent: boolean;
}

export const getSearchBooks = async (params: GetSearchBooksParams) => {
  const response = await api.get<PaginatedResponse<SearchBooksResponse>>('/v2/books/search', {
    params,
  });

  return response.data;
};
