import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getReadingNote } from '../api';

export const useReadingNoteQuery = (noteId?: string | number) => {
  return useQuery({
    queryKey: ['reading-note', noteId],
    queryFn: () => getReadingNote(noteId ?? ''),
    enabled: Boolean(noteId),
    throwOnError: shouldThrowToErrorBoundary,
  });
};
