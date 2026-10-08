import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { unblockUser } from '../Content/api';

const MSG_UNBLOCK_SUCCESS = '차단이 해제되었어요.';
const MSG_UNBLOCK_FAILED = '차단 해제에 실패했어요. 다시 시도해 주세요.';

export const useUnblockUserMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me', 'blocks'] });
      addToast({ description: MSG_UNBLOCK_SUCCESS, type: 'success' });
      onSuccess?.();
    },
    onError: () => {
      addToast({ description: MSG_UNBLOCK_FAILED, type: 'error' });
    },
  });
};
