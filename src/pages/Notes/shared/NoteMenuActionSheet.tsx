import { useLocation, useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';
import useToastStore from 'stores/useToastStore';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { NoteDeleteConfirmModal } from './NoteDeleteConfirmModal';
import type { ReadingNoteResponse } from './api';

type NoteMenuActionSheetProps = {
  note: ReadingNoteResponse;
  readingLogId?: string | number;
};

const MSG_NOTE_ACTION_EDIT = '수정하기';
const MSG_NOTE_ACTION_COPY = '노트 복사하기';
const MSG_NOTE_ACTION_DELETE = '삭제하기';

export const NoteMenuActionSheet = (props: NoteMenuActionSheetProps) => {
  const { note, readingLogId: propReadingLogId } = props;
  const { push } = useLayerStore();
  const { addToast } = useToastStore();
  const location = useLocation();
  const navigate = useNavigate();

  const readingLogId = propReadingLogId ?? note.readingLogId;
  const isNoteDetailPage = location.pathname.startsWith('/notes/');

  const handleEdit = () => {
    navigate(`/notes/${note.id}/edit`, {
      state: {
        note,
        readingLogId: readingLogId ? String(readingLogId) : undefined,
      },
    });
  };
  const handleDelete = () => {
    push({
      id: `note-delete-confirm-modal-${note.id}`,
      component: <NoteDeleteConfirmModal note={note} readingLogId={readingLogId} isNoteDetailPage={isNoteDetailPage} />,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.body);
      addToast({ type: 'success', description: '노트가 클립보드에 복사되었어요.' });
    } catch {
      addToast({ type: 'error', description: '클립보드 복사에 실패했어요.' });
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
