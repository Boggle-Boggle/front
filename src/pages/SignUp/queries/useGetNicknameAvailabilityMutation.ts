import { useMutation } from '@tanstack/react-query';

import { isApiError } from 'api';
import { useToastStore } from 'stores/useToastStore';

import { getNicknameAvailability } from '../api';

const MSG_SIGNUP_NICKNAME_DUPLICATED = '이미 사용 중인 닉네임이에요.';
const MSG_SIGNUP_NICKNAME_INVALID = '사용할 수 없는 닉네임이에요. 다시 확인해 주세요.';
const MSG_SIGNUP_NICKNAME_CHECK_FAILED = '닉네임 확인에 실패했어요. 다시 시도해 주세요.';

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

      if (isApiError(error) && error.code === 'USER_NICKNAME_INVALID') {
        addToast({
          description: MSG_SIGNUP_NICKNAME_INVALID,
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
