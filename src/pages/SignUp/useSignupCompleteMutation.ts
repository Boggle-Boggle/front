import { useMutation } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { createSignupComplete } from './api';

const MSG_SIGNUP_COMPLETE_FAILED = '회원가입에 실패했습니다. 다시 시도해주세요.';

export const useSignupCompleteMutation = () => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createSignupComplete,
    onError: () => {
      addToast({
        description: MSG_SIGNUP_COMPLETE_FAILED,
        type: 'error',
      });
    },
  });
};
