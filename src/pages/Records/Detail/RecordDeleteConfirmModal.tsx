import { useLayerStore } from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { useDeleteReadingLogMutation } from './queries/useDeleteReadingLogMutation';

type RecordDeleteConfirmModalProps = {
  recordId: string | number;
  isbn13?: string | null;
};

const MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE = '독서기록을 삭제하시겠어요?';
const MSG_RECORD_ACTION_DELETE_CONFIRM_DESC =
  '이 독서기록에 등록하신 모든 정보가 삭제되며 복구할 수 없습니다.\n정말로 삭제하시겠습니까?';
const MSG_RECORD_ACTION_CANCEL = '아니오';
const MSG_RECORD_ACTION_CONFIRM = '삭제합니다';

export const RecordDeleteConfirmModal = (props: RecordDeleteConfirmModalProps) => {
  const { recordId, isbn13 } = props;
  const { pop } = useLayerStore();
  const { mutate: deleteLog, isPending: isDeleteLogPending } = useDeleteReadingLogMutation({ recordId, isbn13 });

  const handleClose = () => pop();

  const handleConfirm = () => deleteLog();

  return (
    <ActionModal
      title={MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE}
      description={MSG_RECORD_ACTION_DELETE_CONFIRM_DESC}
      cancelLabel={MSG_RECORD_ACTION_CANCEL}
      confirmLabel={MSG_RECORD_ACTION_CONFIRM}
      confirmVariant="warning"
      onCancel={handleClose}
      onConfirm={handleConfirm}
      isConfirmLoading={isDeleteLogPending}
    />
  );
};
