import { useMutation } from '@tanstack/react-query';

import { isApiError } from 'api';
import { useToastStore } from 'stores/useToastStore';

import { getNicknameAvailability } from './api';

const MSG_SIGNUP_NICKNAME_DUPLICATED = '이미 사용 중인 닉네임입니다.';
const MSG_SIGNUP_NICKNAME_CHECK_FAILED = '닉네임 확인에 실패했습니다. 다시 시도해주세요.';

export const useGetNicknameAvailabilityMutation = () => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: getNicknameAvailability,
    onError: (error) => {
      if (isApiError(error) && error.code === 'USER_NICKNAME_DUPLICATED') {
        addToast({
          description: MSG_SIGNUP_NICKNAME_DUPLICATED,
          type: 'error',
        });

        return;
      }

      addToast({
        description: MSG_SIGNUP_NICKNAME_CHECK_FAILED,
        type: 'error',
      });
    },
  });
};
