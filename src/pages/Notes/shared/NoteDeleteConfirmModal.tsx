import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';
import useToastStore from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { deleteReadingNote, type ReadingNoteResponse } from './api';

type NoteDeleteConfirmModalProps = {
  note: ReadingNoteResponse;
  readingLogId?: string | number | null;
  isNoteDetailPage: boolean;
};

const MSG_NOTE_DELETE_CONFIRM_TITLE = '독서 노트 삭제하기';
const MSG_NOTE_DELETE_CONFIRM_DESC = '정말로 이 노트를 삭제하시겠어요? 한번 삭제한 노트는 복구할 수 없습니다.';
const MSG_NOTE_DELETE_CANCEL = '아니오';
const MSG_NOTE_DELETE_CONFIRM = '네';
const MSG_NOTE_DELETE_SUCCESS = '독서 노트가 삭제되었습니다.';
const MSG_NOTE_DELETE_FAILED = '독서 노트를 삭제하지 못했습니다. 다시 시도해 주세요.';

export const NoteDeleteConfirmModal = (props: NoteDeleteConfirmModalProps) => {
  const { note, readingLogId: propReadingLogId, isNoteDetailPage } = props;
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const readingLogId = propReadingLogId ?? note.readingLogId;

  const { mutate: deleteNote, isPending } = useMutation({
    mutationFn: () => deleteReadingNote(note.id),
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
    onError: () => {
      addToast({ type: 'error', description: MSG_NOTE_DELETE_FAILED });
    },
  });

  return (
    <ActionModal
      title={MSG_NOTE_DELETE_CONFIRM_TITLE}
      description={MSG_NOTE_DELETE_CONFIRM_DESC}
      cancelLabel={MSG_NOTE_DELETE_CANCEL}
      confirmLabel={MSG_NOTE_DELETE_CONFIRM}
      confirmVariant="grey"
      onCancel={pop}
      onConfirm={deleteNote}
      isConfirmLoading={isPending}
    />
  );
};
