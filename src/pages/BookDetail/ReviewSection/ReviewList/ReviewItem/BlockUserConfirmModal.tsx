import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { useBlockReviewUserMutation } from 'pages/BookDetail/queries/useBlockReviewUserMutation';

const MSG_BLOCK_USER_MODAL_TITLE = '유저 차단하기';
const MSG_BLOCK_USER_MODAL_DESCRIPTION = '해당 유저를 차단하시겠어요?\n앞으로 해당 유저의 리뷰를 볼 수 없게 됩니다.';
const MSG_BLOCK_USER_MODAL_CANCEL = '아니오';
const MSG_BLOCK_USER_MODAL_CONFIRM = '네';

type BlockUserConfirmModalProps = {
  userId: number;
};

export const BlockUserConfirmModal = ({ userId }: BlockUserConfirmModalProps) => {
  const { pop } = useLayerStore();
  const { isbn13 = '' } = useParams();
  const blockReviewUserMutation = useBlockReviewUserMutation(pop);

  const handleClose = () => pop();

  const handleConfirm = () => blockReviewUserMutation.mutate({ userId, isbn13 });

  return (
    <ActionModal
      title={MSG_BLOCK_USER_MODAL_TITLE}
      description={MSG_BLOCK_USER_MODAL_DESCRIPTION}
      cancelLabel={MSG_BLOCK_USER_MODAL_CANCEL}
      confirmLabel={MSG_BLOCK_USER_MODAL_CONFIRM}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmVariant="warning"
    />
  );
};
