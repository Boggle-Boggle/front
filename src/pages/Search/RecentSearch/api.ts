import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

interface RecentSearchesResponse {
  keywords: string[];
}

export const getRecentSearches = async () => {
  const response = await api.get<ApiSuccessResponse<RecentSearchesResponse>>('/v2/books/recent-searches');

  return response.data.data.keywords;
};

export const deleteRecentSearch = async (keyword: string) => {
  const encodedKeyword = encodeURIComponent(keyword);

  await api.delete(`/v2/books/recent-searches/${encodedKeyword}`);
};
