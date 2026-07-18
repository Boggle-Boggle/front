import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { PopularBooksResponse } from '../MostRead/api';

export const getRealTimePopularBooks = async () => {
  const response = await api.get<ApiSuccessResponse<PopularBooksResponse>>('/v2/discovery/spotlight-books');
  return response.data.data;
};
