import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { blockUser } from '../api';

const MSG_BLOCK_USER_SUCCESS_TOAST = '해당 유저가 차단되었어요.';
const MSG_BLOCK_USER_FAILED_TOAST = '유저 차단에 실패했어요.';

type BlockReviewUserParams = {
  userId: number;
  itemId: number;
};

export const useBlockReviewUserMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ userId }: BlockReviewUserParams) => blockUser(userId),
    onSuccess: (_data, { itemId }) => {
      addToast({ description: MSG_BLOCK_USER_SUCCESS_TOAST, type: 'error' });
      queryClient.invalidateQueries({ queryKey: ['books', itemId, 'reviews'] });
      onSuccess?.();
    },
    onError: () => {
      addToast({ description: MSG_BLOCK_USER_FAILED_TOAST, type: 'error' });
    },
  });
};
