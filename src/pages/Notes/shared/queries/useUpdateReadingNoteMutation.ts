import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useToastStore from 'stores/useToastStore';

import { updateReadingNote, type ReadingNoteResponse } from '../api';

const MSG_NOTE_EDIT_SUCCESS = '독서 노트가 수정되었어요.';
const MSG_NOTE_EDIT_FAILED = '독서 노트를 수정하지 못했어요. 다시 시도해 주세요.';

type UpdateReadingNoteForm = {
  title: string;
  body: string;
};

type UseUpdateReadingNoteMutationParams = {
  noteId: string;
  readingLogId: string;
  editableNote?: ReadingNoteResponse;
};

export const useUpdateReadingNoteMutation = (params: UseUpdateReadingNoteMutationParams) => {
  const { noteId, readingLogId, editableNote } = params;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: UpdateReadingNoteForm) => {
      return updateReadingNote(noteId, {
        title: data.title,
        body: data.body,
        page: editableNote?.page ?? null,
        tagIds: editableNote?.tags.map((tag) => tag.id) ?? [],
      });
    },
    onSuccess: (_, data) => {
      addToast({ description: MSG_NOTE_EDIT_SUCCESS, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['reading-note', noteId] });
      if (readingLogId) queryClient.invalidateQueries({ queryKey: ['reading-log-notes', readingLogId] });
      navigate(`/notes/${noteId}`, {
        state: {
          note: {
            ...editableNote,
            id: Number(noteId),
            readingLogId: editableNote?.readingLogId ?? (readingLogId ? Number(readingLogId) : null),
            title: data.title,
            body: data.body,
            page: editableNote?.page ?? null,
            tags: editableNote?.tags ?? [],
            createdAt: editableNote?.createdAt ?? new Date().toISOString(),
          },
          readingLogId,
        },
        replace: true,
      });
    },
    onError: () => addToast({ description: MSG_NOTE_EDIT_FAILED, type: 'error' }),
  });
};
