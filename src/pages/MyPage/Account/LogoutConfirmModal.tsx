import { ActionModal } from 'components/Layer/ActionModal';

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
    <ActionModal
      title={MSG_LOGOUT_TITLE}
      description={MSG_LOGOUT_DESCRIPTION}
      cancelLabel={MSG_LOGOUT_CANCEL}
      confirmLabel={MSG_LOGOUT_CONFIRM}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmVariant="warning"
    />
  );
};

export default LogoutConfirmModal;
