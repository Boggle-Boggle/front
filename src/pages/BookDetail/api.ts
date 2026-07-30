import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { BookMediaType } from 'types';

export interface BookDetail {
  isbn13: string;
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  coverUrl: string | null;
  description: string | null;
  category: string;
  totalPages: number | null;
  mediaType: BookMediaType;
  hideAdultContent: boolean;
  isAdult: boolean;
  isInterested: boolean;
}

export const getBookDetail = async (isbn13: string) => {
  const response = await api.get<ApiSuccessResponse<BookDetail>>(`/v2/books/${isbn13}`);

  return response.data.data;
};
