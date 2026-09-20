import { useQuery } from '@tanstack/react-query';

import { TIME_MS } from 'constants/time';

import { getMostReadBooks } from './api';

export const useMostReadBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'mostRead'],
    queryFn: getMostReadBooks,
    staleTime: TIME_MS.MINUTE_10,
  });
};
