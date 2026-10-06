import { useQuery } from '@tanstack/react-query';

import { getReadingLogSummary } from '../api';

export const useReadingLogSummaryQuery = () => {
  return useQuery({
    queryKey: ['reading-logs', 'summary'],
    queryFn: getReadingLogSummary,
  });
};
