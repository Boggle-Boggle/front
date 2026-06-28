import { useMutation } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { getLatestTerms } from '../Terms/api';

const MSG_SIGNUP_TERMS_LOAD_FAILED = '약관 정보를 불러오지 못했습니다. 다시 시도해주세요.';

interface UseLatestTermsMutationParams {
  onSuccess?: () => void;
}

export const useLatestTermsMutation = (params: UseLatestTermsMutationParams = {}) => {
  const { onSuccess } = params;
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: getLatestTerms,
    onError: () => {
      addToast({
        description: MSG_SIGNUP_TERMS_LOAD_FAILED,
        type: 'error',
      });
    },
    onSuccess: () => {
      onSuccess?.();
    },
    retry: false,
  });
};
