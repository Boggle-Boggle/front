import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { likeBookReview, unlikeBookReview } from '../api';

const MSG_REVIEW_LIKE_SUCCESS = '리뷰에 좋아요를 눌렀어요.';
const MSG_REVIEW_UNLIKE_SUCCESS = '리뷰 좋아요를 취소했어요.';
const MSG_REVIEW_LIKE_FAILED = '리뷰 좋아요 처리에 실패했어요.';

type ToggleBookReviewLikeParams = {
  reviewId: string;
  isLiked: boolean;
};

export const useToggleBookReviewLikeMutation = (isbn13: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ reviewId, isLiked }: ToggleBookReviewLikeParams) =>
      isLiked ? unlikeBookReview(reviewId) : likeBookReview(reviewId),
    onSuccess: (_data, { isLiked }) => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      addToast({ description: isLiked ? MSG_REVIEW_UNLIKE_SUCCESS : MSG_REVIEW_LIKE_SUCCESS, type: 'success' });
    },
    onError: () => addToast({ description: MSG_REVIEW_LIKE_FAILED, type: 'error' }),
  });
};
