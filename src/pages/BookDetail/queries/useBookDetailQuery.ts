import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getBookDetail } from '../api';

export const useBookDetailQuery = (itemId: number) => {
  return useQuery({
    queryKey: ['books', 'detail', itemId],
    queryFn: () => getBookDetail(itemId),
    enabled: Number.isSafeInteger(itemId) && itemId > 0,
    throwOnError: shouldThrowToErrorBoundary,
  });
};
