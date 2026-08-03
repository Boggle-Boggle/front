import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { BookDetail } from 'types';

export const getBookDetail = async (isbn13: string) => {
  const response = await api.get<ApiSuccessResponse<BookDetail>>(`/v2/books/${isbn13}`);

  return response.data.data;
};

export const addInterestedBook = async (isbn13: string) => {
  await api.post('/v2/interested-books', { isbn13 });
};

export const deleteInterestedBookByIsbn13 = async (isbn13: string) => {
  await api.delete(`/v2/interested-books/${isbn13}`);
};
