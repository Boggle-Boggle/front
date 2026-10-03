import { useQuery } from '@tanstack/react-query';

import { BOOKSHELVES_QUERY_KEY, getBookshelves } from '../api';

export const useBookshelvesQuery = () => {
  return useQuery({
    queryKey: BOOKSHELVES_QUERY_KEY,
    queryFn: getBookshelves,
  });
};
