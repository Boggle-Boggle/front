import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { updateReadingLog, type UpdateReadingLogRequest } from '../api';

const MSG_UPDATE_READING_LOG_SUCCESS = '독서 정보가 성공적으로 수정되었어요.';
const MSG_UPDATE_READING_LOG_FAILED = '독서 정보 수정에 실패했습니다. 다시 시도해 주세요.';

type UseUpdateReadingLogMutationParams = {
  recordId: string;
  onSuccess?: () => void;
};

export const useUpdateReadingLogMutation = (params: UseUpdateReadingLogMutationParams) => {
  const { recordId, onSuccess } = params;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: UpdateReadingLogRequest) => updateReadingLog(recordId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reading-log', recordId] });
      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      addToast({ description: MSG_UPDATE_READING_LOG_SUCCESS, type: 'success' });
      onSuccess?.();
    },
    onError: () => addToast({ description: MSG_UPDATE_READING_LOG_FAILED, type: 'error' }),
  });
};
