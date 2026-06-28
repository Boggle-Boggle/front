import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { createLogout } from './api';

const MSG_LOGOUT_FAILED = '로그아웃에 실패했습니다. 다시 시도해주세요.';

export const useCreateLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createLogout,
    onError: () => {
      addToast({
        description: MSG_LOGOUT_FAILED,
        type: 'error',
      });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users', 'me'] });
      pop();
      navigate('/login', { replace: true });
    },
  });
};
