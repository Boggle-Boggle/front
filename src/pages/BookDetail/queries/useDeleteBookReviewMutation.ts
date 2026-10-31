import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { deleteBookReview } from '../api';

const MSG_DELETE_REVIEW_SUCCESS_TOAST = '리뷰가 삭제되었어요.';
const MSG_DELETE_REVIEW_FAILED_TOAST = '리뷰 삭제에 실패했어요.';

type DeleteBookReviewParams = {
  reviewId: string;
  itemId: number;
};

export const useDeleteBookReviewMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ reviewId }: DeleteBookReviewParams) => deleteBookReview(reviewId),
    onSuccess: (_data, { itemId }) => {
      addToast({ description: MSG_DELETE_REVIEW_SUCCESS_TOAST, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['books', itemId, 'reviews'] });
      onSuccess?.();
    },
    onError: () => {
      addToast({ description: MSG_DELETE_REVIEW_FAILED_TOAST, type: 'error' });
    },
  });
};
