import { useLocation } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';
import useToastStore from 'stores/useToastStore';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { NoteDeleteConfirmModal } from './NoteDeleteConfirmModal';
import { ReadingNoteResponse } from './api';

type NoteMenuActionSheetProps = {
  note: ReadingNoteResponse;
  readingLogId?: string | number;
};

const MSG_NOTE_ACTION_EDIT = '수정하기';
const MSG_NOTE_ACTION_COPY = '노트 복사하기';
const MSG_NOTE_ACTION_DELETE = '삭제하기';

export const NoteMenuActionSheet = (props: NoteMenuActionSheetProps) => {
  const { note, readingLogId: propReadingLogId } = props;
  const { addToast } = useToastStore();
  const { push } = useLayerStore();
  const location = useLocation();

  const readingLogId = propReadingLogId ?? note.readingLogId;
  const isNoteDetailPage = location.pathname.startsWith('/notes/');

  const handleEdit = () => addToast({ type: 'info', description: '노트 수정 기능이 준비 중입니다.' });
  const handleDelete = () => {
    push({
      id: `note-delete-confirm-modal-${note.id}`,
      component: <NoteDeleteConfirmModal note={note} readingLogId={readingLogId} isNoteDetailPage={isNoteDetailPage} />,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.body);
      addToast({ type: 'success', description: '노트가 클립보드에 복사되었습니다.' });
    } catch {
      addToast({ type: 'error', description: '클립보드 복사에 실패했습니다.' });
    }
  };

  return (
    <ActionSheet
      items={[
        {
          key: 'edit',
          label: MSG_NOTE_ACTION_EDIT,
          onSelect: handleEdit,
        },
        {
          key: 'copy',
          label: MSG_NOTE_ACTION_COPY,
          onSelect: handleCopy,
        },
        {
          key: 'delete',
          label: MSG_NOTE_ACTION_DELETE,
          tone: 'destructive',
          onSelect: handleDelete,
        },
      ]}
    />
  );
};
