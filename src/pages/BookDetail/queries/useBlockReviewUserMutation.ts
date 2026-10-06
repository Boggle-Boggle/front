import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { blockUser } from '../api';

const MSG_BLOCK_USER_SUCCESS_TOAST = '해당 유저가 차단되었습니다.';
const MSG_BLOCK_USER_FAILED_TOAST = '유저 차단에 실패했습니다.';

type BlockReviewUserParams = {
  userId: number;
  isbn13: string;
};

export const useBlockReviewUserMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ userId }: BlockReviewUserParams) => blockUser(userId),
    onSuccess: (_data, { isbn13 }) => {
      addToast({ description: MSG_BLOCK_USER_SUCCESS_TOAST, type: 'error' });
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      onSuccess?.();
    },
    onError: () => {
      addToast({ description: MSG_BLOCK_USER_FAILED_TOAST, type: 'error' });
    },
  });
};
