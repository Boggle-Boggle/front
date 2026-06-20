import { Button } from 'components/Button';
import { Modal } from 'components/Layer/Modal';

type WithdrawConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const MSG_WITHDRAW_MODAL_TITLE = '회원 탈퇴 완료하기';
const MSG_WITHDRAW_MODAL_DESCRIPTION =
  '회원 탈퇴 시 그동안의 이용 기록과 개인 정보가 모두 삭제되며, 복구가 어려우니 불편하시더라도 잠시만 신중히 고민해 주세요.';
const MSG_WITHDRAW_MODAL_CANCEL = '뒤로가기';
const MSG_WITHDRAW_MODAL_CONFIRM = '계정을 삭제합니다';

const WithdrawConfirmModal = (props: WithdrawConfirmModalProps) => {
  const { onCancel, onConfirm } = props;

  return (
    <Modal>
      <div className="flex flex-col px-5 py-5">
        <h2 className="pb-1 text-title2">{MSG_WITHDRAW_MODAL_TITLE}</h2>
        <p className="whitespace-pre-line text-body1 text-neutral-60">{MSG_WITHDRAW_MODAL_DESCRIPTION}</p>

        <div className="flex items-center gap-1 pt-5">
          <Button onClick={onCancel} variant="grey" size="small">
            {MSG_WITHDRAW_MODAL_CANCEL}
          </Button>
          <Button onClick={onConfirm} variant="warning" size="small">
            {MSG_WITHDRAW_MODAL_CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawConfirmModal;
