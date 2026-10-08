import useLayerStore from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';

import type { ReadingNoteResponse } from './api';
import { useDeleteReadingNoteMutation } from './queries/useDeleteReadingNoteMutation';

type NoteDeleteConfirmModalProps = {
  note: ReadingNoteResponse;
  readingLogId?: string | number | null;
  isNoteDetailPage: boolean;
};

const MSG_NOTE_DELETE_CONFIRM_TITLE = '독서 노트 삭제하기';
const MSG_NOTE_DELETE_CONFIRM_DESC = '정말 이 노트를 삭제하시겠어요? 한번 삭제한 노트는 복구할 수 없어요.';
const MSG_NOTE_DELETE_CANCEL = '아니오';
const MSG_NOTE_DELETE_CONFIRM = '네';

export const NoteDeleteConfirmModal = (props: NoteDeleteConfirmModalProps) => {
  const { note, readingLogId: propReadingLogId, isNoteDetailPage } = props;
  const { pop } = useLayerStore();

  const readingLogId = propReadingLogId ?? note.readingLogId;
  const { mutate: deleteNote, isPending } = useDeleteReadingNoteMutation({
    noteId: note.id,
    readingLogId,
    isNoteDetailPage,
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
