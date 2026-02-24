import { useQuery } from '@tanstack/react-query';

import { hasReadingRecordMock } from 'services/mock/search';

export const useCheckReadingRecordQuery = (isbn: string) => {
  return useQuery<number | null>({
    queryKey: ['reading-record', 'check', isbn],
    queryFn: () => hasReadingRecordMock(isbn),
    enabled: !!isbn,
    staleTime: 1000 * 60 * 5,
  });
};
