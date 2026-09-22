import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { deleteReadingLog } from './api';

type RecordDeleteConfirmModalProps = {
  recordId: string | number;
  isbn13?: string | null;
};

const MSG_RECORD_ACTION_DELETE_SUCCESS = '독서기록이 정상적으로 삭제되었습니다.';
const MSG_RECORD_ACTION_DELETE_FAILED = '삭제에 실패했습니다. 다시 시도해 주세요.';
const MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE = '독서기록을 삭제하시겠어요?';
const MSG_RECORD_ACTION_DELETE_CONFIRM_DESC =
  '이 독서기록에 등록하신 모든 정보가 삭제되며 복구할 수 없습니다.\n정말로 삭제하시겠습니까?';
const MSG_RECORD_ACTION_CANCEL = '아니오';
const MSG_RECORD_ACTION_CONFIRM = '삭제합니다';

export const RecordDeleteConfirmModal = (props: RecordDeleteConfirmModalProps) => {
  const { recordId, isbn13 } = props;
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteLog, isPending } = useMutation({
    mutationFn: () => deleteReadingLog(recordId),
    onSuccess: () => {
      pop();

      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
      if (isbn13) queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });

      addToast({
        type: 'success',
        description: MSG_RECORD_ACTION_DELETE_SUCCESS,
      });

      navigate('/library', { replace: true });
    },
    onError: () => {
      addToast({
        type: 'error',
        description: MSG_RECORD_ACTION_DELETE_FAILED,
      });
    },
  });

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
      isConfirmLoading={isPending}
    />
  );
};
