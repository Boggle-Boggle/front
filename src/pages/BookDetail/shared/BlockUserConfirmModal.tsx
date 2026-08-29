import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { blockUser } from 'pages/BookDetail/api';

const MSG_BLOCK_USER_MODAL_TITLE = '유저 차단하기';
const MSG_BLOCK_USER_MODAL_DESCRIPTION = '해당 유저를 차단하시겠어요?\n앞으로 해당 유저의 리뷰를 볼 수 없게 됩니다.';
const MSG_BLOCK_USER_MODAL_CANCEL = '아니오';
const MSG_BLOCK_USER_MODAL_CONFIRM = '네';
const MSG_BLOCK_USER_SUCCESS_TOAST = '해당 유저가 차단되었습니다.';
const MSG_BLOCK_USER_FAILED_TOAST = '유저 차단에 실패했습니다.';

type BlockUserConfirmModalProps = {
  userId: number;
};

export const BlockUserConfirmModal = ({ userId }: BlockUserConfirmModalProps) => {
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const { isbn13 = '' } = useParams();
  const queryClient = useQueryClient();

  const blockMutation = useMutation({
    mutationFn: () => blockUser(userId),
    onSuccess: () => {
      addToast({
        description: MSG_BLOCK_USER_SUCCESS_TOAST,
        type: 'error',
      });
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      pop();
    },
    onError: () => {
      addToast({
        description: MSG_BLOCK_USER_FAILED_TOAST,
        type: 'error',
      });
    },
  });

  const handleClose = () => pop();

  const handleConfirm = () => blockMutation.mutate();

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
