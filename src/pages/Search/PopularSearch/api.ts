import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface PopularKeyword {
  rank: number;
  keyword: string;
}

interface PopularKeywordsResponse {
  items: PopularKeyword[];
}

export const getPopularKeywords = async () => {
  const response = await api.get<ApiSuccessResponse<PopularKeywordsResponse>>('/v2/discovery/popular-keywords');

  return response.data.data.items;
};
