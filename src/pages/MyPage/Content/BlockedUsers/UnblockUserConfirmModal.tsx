import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { unblockUser } from '../api';

const MSG_UNBLOCK_USER_MODAL_TITLE = '유저 차단 해제하기';
const MSG_UNBLOCK_USER_MODAL_DESCRIPTION = '해당 유저의 차단을 해제하시겠어요?';
const MSG_UNBLOCK_USER_MODAL_CANCEL = '아니오';
const MSG_UNBLOCK_USER_MODAL_CONFIRM = '네';
const MSG_UNBLOCK_SUCCESS = '차단이 해제되었습니다.';
const MSG_UNBLOCK_FAILED = '차단 해제에 실패했습니다. 다시 시도해주세요.';

type UnblockUserConfirmModalProps = {
  userId: number;
};

export const UnblockUserConfirmModal = (props: UnblockUserConfirmModalProps) => {
  const { userId } = props;
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  const { mutate: unblock, isPending } = useMutation({
    mutationFn: () => unblockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me', 'blocks'] });
      addToast({
        description: MSG_UNBLOCK_SUCCESS,
        type: 'success',
      });
      pop();
    },
    onError: () => {
      addToast({
        description: MSG_UNBLOCK_FAILED,
        type: 'error',
      });
    },
  });

  const handleClose = () => pop();

  const handleConfirm = () => unblock();

  return (
    <ActionModal
      title={MSG_UNBLOCK_USER_MODAL_TITLE}
      description={MSG_UNBLOCK_USER_MODAL_DESCRIPTION}
      cancelLabel={MSG_UNBLOCK_USER_MODAL_CANCEL}
      confirmLabel={MSG_UNBLOCK_USER_MODAL_CONFIRM}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      isConfirmLoading={isPending}
      confirmVariant="warning"
    />
  );
};
