import { useMutation, useQueryClient } from '@tanstack/react-query';

import { isApiError } from 'api';
import { useToastStore } from 'stores/useToastStore';

import { changeNickname } from './api';

const MSG_ACCOUNT_NICKNAME_CHANGE_SUCCESS = '닉네임이 변경되었습니다.';
const MSG_ACCOUNT_NICKNAME_DUPLICATED = '이미 사용 중인 닉네임입니다.';
const MSG_ACCOUNT_NICKNAME_INVALID = '사용할 수 없는 닉네임입니다. 다시 확인해주세요.';
const MSG_ACCOUNT_NICKNAME_UNCHANGED = '현재 닉네임과 동일합니다.';
const MSG_ACCOUNT_NICKNAME_CHANGE_FAILED = '닉네임 변경에 실패했습니다. 다시 시도해주세요.';

export const useChangeNicknameMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: changeNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });

      addToast({
        description: MSG_ACCOUNT_NICKNAME_CHANGE_SUCCESS,
        type: 'success',
      });
    },
    onError: (error) => {
      if (isApiError(error) && error.code === 'USER_NICKNAME_DUPLICATED') {
        addToast({
          description: MSG_ACCOUNT_NICKNAME_DUPLICATED,
          type: 'error',
        });

        return;
      }

      if (isApiError(error) && error.code === 'USER_NICKNAME_INVALID') {
        addToast({
          description: MSG_ACCOUNT_NICKNAME_INVALID,
          type: 'error',
        });

        return;
      }

      if (isApiError(error) && error.code === 'USER_NICKNAME_UNCHANGED') {
        addToast({
          description: MSG_ACCOUNT_NICKNAME_UNCHANGED,
          type: 'error',
        });

        return;
      }

      addToast({
        description: MSG_ACCOUNT_NICKNAME_CHANGE_FAILED,
        type: 'error',
      });
    },
  });
};
