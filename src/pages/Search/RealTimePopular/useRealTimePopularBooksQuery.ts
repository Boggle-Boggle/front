import { useQuery } from '@tanstack/react-query';

import { getRealTimePopularBooks } from './api';

export const useRealTimePopularBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'realtimePopular'],
    queryFn: getRealTimePopularBooks,
  });
};
