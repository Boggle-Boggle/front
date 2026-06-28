import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { deleteMe } from './api';

const MSG_DELETE_ME_FAILED = '계정 삭제에 실패했습니다. 다시 시도해주세요.';
const ROUTE_ACCOUNT_WITHDRAW_COMPLETE = '/mypage/account/withdraw-complete';

export const useDeleteMeMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteMe,
    onError: () => {
      addToast({
        description: MSG_DELETE_ME_FAILED,
        type: 'error',
      });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users', 'me'] });
      pop();
      navigate(ROUTE_ACCOUNT_WITHDRAW_COMPLETE, { replace: true });
    },
  });
};
