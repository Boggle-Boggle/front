import { ActionModal } from 'components/Layer/ActionModal';

import type { BookshelfItem } from './api';
import { useDeleteBookshelfMutation } from './queries/useDeleteBookshelfMutation';

type GroupDeleteConfirmModalProps = {
  bookshelf: BookshelfItem;
  onClose: () => void;
  onDeleted?: (bookshelfId: number) => void;
};

const MSG_RECORD_GROUP_DELETE_TITLE = '그룹 삭제하기';
const MSG_RECORD_GROUP_DELETE_DESCRIPTION =
  '정말 이 그룹을 삭제하시겠어요?\n그룹이 삭제되어도 독서기록은 삭제되지 않아요.';
const MSG_RECORD_GROUP_DELETE_CANCEL = '아니오';
const MSG_RECORD_GROUP_DELETE_CONFIRM = '삭제하기';

export const GroupDeleteConfirmModal = (props: GroupDeleteConfirmModalProps) => {
  const { bookshelf, onClose, onDeleted } = props;
  const { isPending, mutate: deleteGroup } = useDeleteBookshelfMutation({
    onSuccess: (bookshelfId) => {
      onDeleted?.(bookshelfId);
      onClose();
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
