import { api } from 'api';

import { PaginatedApiResponse } from 'types/api';
import { BookSearchItemResponse, BookSearchRequest } from 'types/search';

export const getBooksSearch = async (request: BookSearchRequest) => {
  const response = await api.get<
    PaginatedApiResponse<BookSearchItemResponse[]>,
    PaginatedApiResponse<BookSearchItemResponse[]>
  >('/v2/books/search', {
    params: request,
  });

  return response;
};
