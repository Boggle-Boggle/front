import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from 'constants/index';

import { getTrendingBooks } from './api';

export const useTrendingBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'trending'],
    queryFn: getTrendingBooks,
    staleTime: QUERY_STALE_TIME.MIN_10,
  });
};
