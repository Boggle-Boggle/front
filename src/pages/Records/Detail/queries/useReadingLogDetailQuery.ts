import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getReadingLogDetail } from '../api';

export const useReadingLogDetailQuery = (recordId: string) => {
  return useQuery({
    queryKey: ['reading-log', recordId],
    queryFn: () => getReadingLogDetail(recordId),
    select: (detail) => ({
      ...detail,
      readingLog: {
        ...detail.readingLog,
        rating: detail.readingLog.rating ?? 0,
      },
    }),
    enabled: Boolean(recordId),
    throwOnError: shouldThrowToErrorBoundary,
  });
};
