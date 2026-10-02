import { useQuery } from '@tanstack/react-query';

import { getReadingLogNotes } from '../api';

export const useReadingLogNotesQuery = (readingLogId?: string | number) => {
  return useQuery({
    queryKey: ['reading-log-notes', readingLogId],
    queryFn: () => getReadingLogNotes(readingLogId ?? ''),
    enabled: Boolean(readingLogId),
  });
};
