import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';
import useToastStore from 'stores/useToastStore';

import { deleteReadingNote } from '../api';

const MSG_NOTE_DELETE_SUCCESS = '독서 노트가 삭제되었습니다.';
const MSG_NOTE_DELETE_FAILED = '독서 노트를 삭제하지 못했습니다. 다시 시도해 주세요.';

type UseDeleteReadingNoteMutationParams = {
  noteId: string | number;
  readingLogId?: string | number | null;
  isNoteDetailPage: boolean;
};

export const useDeleteReadingNoteMutation = (params: UseDeleteReadingNoteMutationParams) => {
  const { noteId, readingLogId, isNoteDetailPage } = params;
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteReadingNote(noteId),
    onSuccess: () => {
      pop();

      if (readingLogId) {
        queryClient.invalidateQueries({ queryKey: ['reading-log-notes', String(readingLogId)] });
        queryClient.invalidateQueries({ queryKey: ['reading-log', String(readingLogId)] });
      }

      addToast({ type: 'success', description: MSG_NOTE_DELETE_SUCCESS });

      if (isNoteDetailPage && readingLogId) {
        navigate(`/records/${readingLogId}`, { replace: true, state: { activeTab: 'note' } });
      }
    },
    onError: () => addToast({ type: 'error', description: MSG_NOTE_DELETE_FAILED }),
  });
};
