import useToastStore from 'stores/useToastStore';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { ReadingNoteResponse } from './api';

type NoteMenuActionSheetProps = {
  note: ReadingNoteResponse;
};

const MSG_NOTE_ACTION_EDIT = '수정하기';
const MSG_NOTE_ACTION_COPY = '노트 복사하기';
const MSG_NOTE_ACTION_DELETE = '삭제하기';

export const NoteMenuActionSheet = ({ note }: NoteMenuActionSheetProps) => {
  const { addToast } = useToastStore();

  const handleEdit = () => addToast({ type: 'info', description: '노트 수정 기능이 준비 중입니다.' });
  const handleDelete = () => addToast({ type: 'info', description: '노트 삭제 기능이 준비 중입니다.' });

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
