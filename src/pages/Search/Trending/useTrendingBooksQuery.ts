import { useQuery } from '@tanstack/react-query';

import { TIME_MS } from 'constants/time';

import { getTrendingBooks } from './api';

export const useTrendingBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'trending'],
    queryFn: getTrendingBooks,
    staleTime: TIME_MS.MINUTE_10,
  });
};
