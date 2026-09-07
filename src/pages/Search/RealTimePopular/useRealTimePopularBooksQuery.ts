import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from 'constants/index';

import { getRealTimePopularBooks } from './api';

export const useRealTimePopularBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'realtimePopular'],
    queryFn: getRealTimePopularBooks,
    staleTime: QUERY_STALE_TIME.MIN_10,
  });
};
