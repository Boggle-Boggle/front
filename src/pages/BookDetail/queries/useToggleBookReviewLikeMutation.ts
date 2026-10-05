import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likeBookReview, unlikeBookReview } from '../api';

type ToggleBookReviewLikeParams = {
  reviewId: string;
  isLiked: boolean;
};

export const useToggleBookReviewLikeMutation = (isbn13: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, isLiked }: ToggleBookReviewLikeParams) =>
      isLiked ? unlikeBookReview(reviewId) : likeBookReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
    },
  });
};
