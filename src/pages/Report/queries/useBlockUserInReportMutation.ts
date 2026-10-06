import { useMutation } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { blockUserInReport } from '../api';

const MSG_REPORT_BLOCK_SUCCESS_TOAST = '해당 유저가 차단되었습니다.';
const MSG_REPORT_BLOCK_FAILED_TOAST = '유저 차단에 실패했습니다.';

export const useBlockUserInReportMutation = (onSuccess?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: blockUserInReport,
    onSuccess: () => {
      addToast({ description: MSG_REPORT_BLOCK_SUCCESS_TOAST, type: 'success' });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : MSG_REPORT_BLOCK_FAILED_TOAST;
      addToast({ description: message, type: 'error' });
    },
  });
};
