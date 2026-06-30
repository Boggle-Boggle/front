import { useQuery } from '@tanstack/react-query';

import { getBookDetail } from './api';

export const useBookDetailQuery = (bookId: string) => {
  return useQuery({
    queryKey: ['books', 'detail', bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: Boolean(bookId),
  });
};
