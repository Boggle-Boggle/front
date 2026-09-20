import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { ActionSheet } from 'components/Layer/ActionSheet';

import { deleteReadingLog } from './api';

type EditableCustomBook = {
  title: string;
  author: string;
  publisher?: string;
  isbn?: string;
  totalPages?: number;
  coverUrl?: string;
  description?: string;
};

type RecordMenuActionSheetProps = {
  recordId: string | number;
  isbn13?: string | null;
  customBook?: EditableCustomBook;
};

const MSG_RECORD_ACTION_SEARCH_MORE = '도서 검색에서 더보기';
const MSG_RECORD_ACTION_EDIT_CUSTOM = '내가 등록한 책 정보 수정하기';
const MSG_RECORD_ACTION_DELETE = '독서기록 삭제하기';

const MSG_RECORD_ACTION_DELETE_SUCCESS = '독서기록이 정상적으로 삭제되었습니다.';
const MSG_RECORD_ACTION_DELETE_FAILED = '삭제에 실패했습니다. 다시 시도해 주세요.';
const MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE = '독서기록을 삭제하시겠어요?';
const MSG_RECORD_ACTION_DELETE_CONFIRM_DESC =
  '이 독서기록에 등록하신 모든 정보가 삭제되며 복구할 수 없습니다.\n정말로 삭제하시겠습니까?';
const MSG_RECORD_ACTION_CANCEL = '아니오';
const MSG_RECORD_ACTION_CONFIRM = '삭제합니다';

export const RecordMenuActionSheet = (props: RecordMenuActionSheetProps) => {
  const { recordId, isbn13, customBook } = props;
  const { push, pop } = useLayerStore();
  const { addToast } = useToastStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isCustomBook = !isbn13;

  const { mutate: deleteLog, isPending } = useMutation({
    mutationFn: () => deleteReadingLog(recordId),
    onSuccess: () => {
      pop();

      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
      if (isbn13) queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });

      addToast({
        type: 'success',
        description: MSG_RECORD_ACTION_DELETE_SUCCESS,
      });

      navigate('/library', { replace: true });
    },
    onError: () => {
      addToast({
        type: 'error',
        description: MSG_RECORD_ACTION_DELETE_FAILED,
      });
    },
  });

  const handleDeleteClick = () => {
    pop();
    push({
      id: 'delete-confirm-modal',
      component: (
        <ActionModal
          title={MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE}
          description={MSG_RECORD_ACTION_DELETE_CONFIRM_DESC}
          cancelLabel={MSG_RECORD_ACTION_CANCEL}
          confirmLabel={MSG_RECORD_ACTION_CONFIRM}
          confirmVariant="warning"
          onCancel={pop}
          onConfirm={deleteLog}
          isConfirmLoading={isPending}
        />
      ),
    });
  };

  const handleSearchMoreOrEdit = () => {
    if (isCustomBook && customBook) {
      pop();
      navigate('/records/new/custom-book', {
        state: {
          mode: 'edit',
          recordId,
          customBook: {
            ...customBook,
            mediaType: 'BOOK',
          },
        },
      });
    } else if (isbn13) {
      navigate(`/books/${isbn13}`);
    }
  };

  return (
    <ActionSheet
      items={[
        {
          key: isCustomBook ? 'edit_custom' : 'search_more',
          label: isCustomBook ? MSG_RECORD_ACTION_EDIT_CUSTOM : MSG_RECORD_ACTION_SEARCH_MORE,
          onSelect: handleSearchMoreOrEdit,
        },
        {
          key: 'delete_my_book',
          label: MSG_RECORD_ACTION_DELETE,
          onSelect: handleDeleteClick,
        },
      ]}
    />
  );
};
