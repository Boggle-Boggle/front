import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { BOOKSHELVES_QUERY_KEY, deleteBookshelf, type BookshelfItem } from './api';

type GroupDeleteConfirmModalProps = {
  bookshelf: BookshelfItem;
  onClose: () => void;
  onDeleted?: (bookshelfId: number) => void;
};

const MSG_RECORD_GROUP_DELETE_TITLE = '그룹 삭제하기';
const MSG_RECORD_GROUP_DELETE_DESCRIPTION =
  '정말 이 그룹을 삭제하시겠습니까?\n그룹이 삭제되어도 독서기록은 삭제되지 않습니다.';
const MSG_RECORD_GROUP_DELETE_CANCEL = '아니오';
const MSG_RECORD_GROUP_DELETE_CONFIRM = '삭제하기';
const MSG_RECORD_GROUP_DELETE_FAILED = '그룹을 삭제하지 못했습니다. 다시 시도해주세요.';

export const GroupDeleteConfirmModal = (props: GroupDeleteConfirmModalProps) => {
  const { bookshelf, onClose, onDeleted } = props;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { isPending, mutate: deleteGroup } = useMutation({
    mutationFn: deleteBookshelf,
    onSuccess: () => {
      onDeleted?.(bookshelf.id);
      queryClient.invalidateQueries({ queryKey: BOOKSHELVES_QUERY_KEY });
      onClose();
    },
    onError: () => {
      addToast({
        description: MSG_RECORD_GROUP_DELETE_FAILED,
        type: 'error',
      });
    },
  });

  const handleConfirmDelete = () => {
    deleteGroup(bookshelf.id);
  };

  return (
    <ActionModal
      title={MSG_RECORD_GROUP_DELETE_TITLE}
      description={MSG_RECORD_GROUP_DELETE_DESCRIPTION}
      cancelLabel={MSG_RECORD_GROUP_DELETE_CANCEL}
      confirmLabel={MSG_RECORD_GROUP_DELETE_CONFIRM}
      onCancel={onClose}
      onConfirm={handleConfirmDelete}
      isConfirmLoading={isPending}
      confirmVariant="warning"
    />
  );
};
