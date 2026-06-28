import { ActionModal } from 'components/Layer/ActionModal';

import type { WithdrawalReasonCode } from '../api';
import { useDeleteMeMutation } from '../useDeleteMeMutation';

type WithdrawConfirmModalProps = {
  onCancel: () => void;
  reason: WithdrawalReasonCode;
  customText: string;
};

const MSG_WITHDRAW_MODAL_TITLE = '회원 탈퇴 완료하기';
const MSG_WITHDRAW_MODAL_DESCRIPTION =
  '회원 탈퇴 시 그동안의 이용 기록과 개인 정보가 모두 삭제되며, 복구가 어려우니 불편하시더라도 잠시만 신중히 고민해 주세요.';
const MSG_WITHDRAW_MODAL_CANCEL = '뒤로가기';
const MSG_WITHDRAW_MODAL_CONFIRM = '계정을 삭제합니다';

const WithdrawConfirmModal = (props: WithdrawConfirmModalProps) => {
  const { onCancel, reason, customText } = props;
  const { isPending: isDeleteMePending, mutate: deleteMe } = useDeleteMeMutation();
  const trimmedCustomText = customText.trim();

  const handleConfirm = () => {
    deleteMe({
      reason,
      ...(reason === 'OTHER' && trimmedCustomText.length > 0 ? { customText: trimmedCustomText } : {}),
    });
  };

  return (
    <ActionModal
      title={MSG_WITHDRAW_MODAL_TITLE}
      description={MSG_WITHDRAW_MODAL_DESCRIPTION}
      cancelLabel={MSG_WITHDRAW_MODAL_CANCEL}
      confirmLabel={MSG_WITHDRAW_MODAL_CONFIRM}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      isConfirmLoading={isDeleteMePending}
      confirmVariant="warning"
    />
  );
};

export default WithdrawConfirmModal;
