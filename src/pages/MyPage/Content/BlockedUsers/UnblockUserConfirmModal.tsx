import { useLayerStore } from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { useUnblockUserMutation } from '../../queries/useUnblockUserMutation';

const MSG_UNBLOCK_USER_MODAL_TITLE = '유저 차단 해제하기';
const MSG_UNBLOCK_USER_MODAL_DESCRIPTION = '해당 유저의 차단을 해제하시겠어요?';
const MSG_UNBLOCK_USER_MODAL_CANCEL = '아니오';
const MSG_UNBLOCK_USER_MODAL_CONFIRM = '네';

type UnblockUserConfirmModalProps = {
  userId: number;
};

export const UnblockUserConfirmModal = (props: UnblockUserConfirmModalProps) => {
  const { userId } = props;
  const { pop } = useLayerStore();
  const { mutate: unblock, isPending } = useUnblockUserMutation(pop);

  const handleClose = () => pop();

  const handleConfirm = () => unblock(userId);

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
