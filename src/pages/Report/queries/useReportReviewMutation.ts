import { useMutation } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { reportReview } from '../api';

const MSG_REPORT_SUCCESS_TOAST = '신고가 정상 접수되었어요.';
const MSG_REPORT_FAILED_TOAST = '신고 접수에 실패했어요.';

export const useReportReviewMutation = (onSuccess?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: reportReview,
    onSuccess: () => {
      addToast({ description: MSG_REPORT_SUCCESS_TOAST, type: 'success' });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : MSG_REPORT_FAILED_TOAST;
      addToast({ description: message, type: 'error' });
    },
  });
};
