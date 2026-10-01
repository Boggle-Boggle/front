import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getBookshelves } from '../api';

export const useMainBookshelvesQuery = () => {
  return useQuery({
    queryKey: ['bookshelves'],
    queryFn: getBookshelves,
    throwOnError: shouldThrowToErrorBoundary,
  });
};
