import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface AuthorRecommendationResponse {
  author: string;
  itemId: number;
  isbn13: string | null;
  title: string;
  coverUrl: string | null;
  description: string | null;
}

export const getAuthorRecommendation = async () => {
  const response = await api.get<ApiSuccessResponse<AuthorRecommendationResponse | null>>(
    '/v2/recommendations/by-author',
  );

  return response.data.data;
};
