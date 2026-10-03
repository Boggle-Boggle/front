import { useQuery } from '@tanstack/react-query';

import { getReadingLogDetail } from 'pages/Records/Detail/api';

type UseReadingLogTitleQueryParams = {
  readingLogId?: string | number;
  enabled?: boolean;
};

export const useReadingLogTitleQuery = (params: UseReadingLogTitleQueryParams) => {
  const { readingLogId, enabled = true } = params;

  return useQuery({
    queryKey: ['reading-log', readingLogId],
    queryFn: () => getReadingLogDetail(readingLogId ?? ''),
    enabled: enabled && Boolean(readingLogId),
    select: (readingLogData) => readingLogData.book.title,
  });
};
