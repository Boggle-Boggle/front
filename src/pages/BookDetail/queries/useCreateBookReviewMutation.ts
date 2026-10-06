import { useMutation, useQueryClient } from '@tanstack/react-query';

import { isApiError } from 'api';
import { useToastStore } from 'stores/useToastStore';

import { createBookReview } from '../api';

const MSG_REVIEW_NOT_ELIGIBLE = '읽지 않은 책에는 리뷰를 남길 수 없습니다.';
const MSG_REVIEW_CREATE_FAILED = '리뷰 등록에 실패했습니다. 다시 시도해 주세요.';
const REVIEW_NOT_ELIGIBLE_ERROR_CODE = 'REVIEW_NOT_ELIGIBLE';

export const useCreateBookReviewMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createBookReview,
    onSuccess: (_data, { isbn13 }) => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      onSuccess?.();
    },
    onError: (error) => {
      addToast({
        type: 'error',
        description:
          isApiError(error) && error.code === REVIEW_NOT_ELIGIBLE_ERROR_CODE
            ? MSG_REVIEW_NOT_ELIGIBLE
            : MSG_REVIEW_CREATE_FAILED,
      });
    },
  });
};
