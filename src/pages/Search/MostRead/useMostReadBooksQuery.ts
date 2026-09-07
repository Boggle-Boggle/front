import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from 'constants/index';

import { getMostReadBooks } from './api';

export const useMostReadBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'mostRead'],
    queryFn: getMostReadBooks,
    staleTime: QUERY_STALE_TIME.MIN_10,
  });
};
