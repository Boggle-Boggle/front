import { Button } from 'components/Button';
import { Modal } from 'components/Layer/Modal';

type LogoutConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const MSG_LOGOUT_TITLE = '로그아웃하기';
const MSG_LOGOUT_DESCRIPTION = '정말로 로그아웃 하시겠습니까?';
const MSG_LOGOUT_CANCEL = '아니오';
const MSG_LOGOUT_CONFIRM = '로그아웃 합니다';

const LogoutConfirmModal = (props: LogoutConfirmModalProps) => {
  const { onCancel, onConfirm } = props;

  return (
    <Modal>
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="text-title2">{MSG_LOGOUT_TITLE}</h2>
        <p className="text-body1 text-neutral-60">{MSG_LOGOUT_DESCRIPTION}</p>
      </div>

      <div className="flex items-center gap-1 text-body1">
        <Button onClick={onCancel} variant="grey" size="small">
          {MSG_LOGOUT_CANCEL}
        </Button>
        <Button onClick={onConfirm} variant="warning" size="small">
          {MSG_LOGOUT_CONFIRM}
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
