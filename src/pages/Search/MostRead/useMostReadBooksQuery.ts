import { useQuery } from '@tanstack/react-query';

import { getMostReadBooks } from './api';

export const useMostReadBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'mostRead'],
    queryFn: getMostReadBooks,
  });
};

