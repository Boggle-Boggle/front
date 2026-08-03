import { useQuery } from '@tanstack/react-query';

import { getBookDetail } from './api';

export const useBookDetailQuery = (isbn13: string) => {
  return useQuery({
    queryKey: ['books', 'detail', isbn13],
    queryFn: () => getBookDetail(isbn13),
    enabled: Boolean(isbn13),
  });
};
