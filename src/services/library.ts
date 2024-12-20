import { PaginationResponse } from 'types/api';
import { LibraryBook, GetLibraryBooksParams, SortingType } from 'types/library';

import api from '.';

export const getLibraryBooks = async (params: GetLibraryBooksParams, pageNum: number) => {
  const queryString = new URLSearchParams();

  queryString.append('pageNum', pageNum.toString());
  queryString.append('pageSize', '20');
  if (params.libraryId !== undefined) queryString.append('libraryId', params.libraryId.toString());
  if (params.status) queryString.append('status', params.status);
  if (params.keyword) queryString.append('keyword', params.keyword);

  const response = await api.get(`/library?${queryString.toString()}`);

  return response.data.data as PaginationResponse<LibraryBook[]>;
};

export const getLibrarySorting = async () => {
  const response = await api.get('/user/settings/sorting');

  return response.data.data as SortingType;
};

export const changeLibrarySorting = async (sortingType: SortingType) => {
  await api.patch('/user/settings/sorting', { sortingType });
};

export const removeLibrary = async (removeId: number) => {
  await api.delete(`/libraries?libraryId=${removeId}`);
};

export const addLibrary = async (libraryName: string) => {
  await api.post('/libraries', { libraryName });
};
