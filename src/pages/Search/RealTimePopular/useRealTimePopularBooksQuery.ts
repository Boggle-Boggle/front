import { useQuery } from '@tanstack/react-query';

import { TIME_MS } from 'constants/time';

import { getRealTimePopularBooks } from './api';

export const useRealTimePopularBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'realtimePopular'],
    queryFn: getRealTimePopularBooks,
    staleTime: TIME_MS.MINUTE_10,
  });
};
