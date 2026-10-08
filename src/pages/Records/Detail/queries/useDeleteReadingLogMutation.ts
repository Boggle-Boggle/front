import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { deleteReadingLog } from '../api';

const MSG_DELETE_READING_LOG_SUCCESS = '독서기록이 삭제되었어요.';
const MSG_DELETE_READING_LOG_FAILED = '삭제에 실패했어요. 다시 시도해 주세요.';

type UseDeleteReadingLogMutationParams = {
  recordId: string | number;
  isbn13?: string | null;
};

export const useDeleteReadingLogMutation = (params: UseDeleteReadingLogMutationParams) => {
  const { recordId, isbn13 } = params;
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteReadingLog(recordId),
    onSuccess: () => {
      pop();

      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
      if (isbn13) queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });

      addToast({ type: 'success', description: MSG_DELETE_READING_LOG_SUCCESS });
      navigate('/library', { replace: true });
    },
    onError: () => addToast({ type: 'error', description: MSG_DELETE_READING_LOG_FAILED }),
  });
};
