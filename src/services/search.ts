import { PaginationResponse } from 'types/api';
import { Book } from 'types/book';

import api from '.';

const getSearchBooks = async (query: string, page: number) => {
  const response = await api.get(`/books?query=${query}&pageNum=${page}`);

  return response.data.data as PaginationResponse<Book[]>;
};

export default getSearchBooks;
