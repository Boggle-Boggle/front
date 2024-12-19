import { PaginationResponse } from 'types/api';
import { LibraryBook, GetLibraryBooksParams } from 'types/library';

import api from '.';

// eslint-disable-next-line import/prefer-default-export
export const getLibraryBooks = async (params: GetLibraryBooksParams, pageNum: number) => {
  const queryString = new URLSearchParams();

  queryString.append('pageNum', pageNum.toString());
  if (params.libraryId !== undefined) queryString.append('libraryId', params.libraryId.toString());
  if (params.status) queryString.append('status', params.status);
  if (params.pageSize !== undefined) queryString.append('pageSize', params.pageSize.toString());
  if (params.keyword) queryString.append('keyword', params.keyword);

  const response = await api.get(`/library?${queryString.toString()}`);

  return response.data.data as PaginationResponse<LibraryBook[]>;
};
