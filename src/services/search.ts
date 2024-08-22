import { PaginationResponse } from 'types/api';
import { Book } from 'types/book';

import api from '.';

const getSearchBooks = async (query: string) => {
  const response = await api.get(`/books?query=${query}&pageNum=1`);

  return response.data.data as PaginationResponse<Book[]>;
};

export default getSearchBooks;
