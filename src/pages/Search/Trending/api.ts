import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { PopularBooksResponse } from '../MostRead/api';

export const getTrendingBooks = async () => {
  const response = await api.get<ApiSuccessResponse<PopularBooksResponse>>('/v2/discovery/trending-books');
  return response.data.data;
};
