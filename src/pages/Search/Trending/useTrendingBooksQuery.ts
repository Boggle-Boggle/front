import { useQuery } from '@tanstack/react-query';

import { getTrendingBooks } from './api';

export const useTrendingBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'trending'],
    queryFn: getTrendingBooks,
  });
};
