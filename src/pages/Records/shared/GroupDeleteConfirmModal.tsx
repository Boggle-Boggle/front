import { ActionModal } from 'components/Layer/ActionModal';

type GroupDeleteConfirmModalProps = {
  onClose: () => void;
};

const MSG_RECORD_GROUP_DELETE_TITLE = '그룹 삭제하기';
const MSG_RECORD_GROUP_DELETE_DESCRIPTION = '정말 이 그룹을 삭제하시나요?';
const MSG_RECORD_GROUP_DELETE_CANCEL = '아니오';
const MSG_RECORD_GROUP_DELETE_CONFIRM = '삭제하기';

export const GroupDeleteConfirmModal = (props: GroupDeleteConfirmModalProps) => {
  const { onClose } = props;

  return (
    <ActionModal
      title={MSG_RECORD_GROUP_DELETE_TITLE}
      description={MSG_RECORD_GROUP_DELETE_DESCRIPTION}
      cancelLabel={MSG_RECORD_GROUP_DELETE_CANCEL}
      confirmLabel={MSG_RECORD_GROUP_DELETE_CONFIRM}
      onCancel={onClose}
      onConfirm={onClose}
      confirmVariant="warning"
    />
  );
};
