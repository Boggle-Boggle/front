import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useToastStore from 'stores/useToastStore';

import { createReadingNote } from '../api';

const MSG_NOTE_NEW_SUCCESS = '독서 노트가 저장되었습니다.';
const MSG_NOTE_NEW_FAILED = '독서 노트를 저장하지 못했습니다. 다시 시도해 주세요.';

type CreateReadingNoteForm = {
  title: string;
  body: string;
};

export const useCreateReadingNoteMutation = (readingLogId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: CreateReadingNoteForm) => {
      return createReadingNote(readingLogId, {
        title: data.title,
        body: data.body,
        page: null,
        tagIds: [],
      });
    },
    onSuccess: () => {
      addToast({ description: MSG_NOTE_NEW_SUCCESS, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['reading-log-notes', readingLogId] });
      navigate(`/records/${readingLogId}`, { state: { activeTab: 'note' }, replace: true });
    },
    onError: () => addToast({ description: MSG_NOTE_NEW_FAILED, type: 'error' }),
  });
};
