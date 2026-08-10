import { useMutation, useQueryClient } from '@tanstack/react-query';

import { isApiError } from 'api';
import { useToastStore } from 'stores/useToastStore';

import { changeNickname } from './api';
import type { MyPageProfileResponse } from '../api';

const MSG_ACCOUNT_NICKNAME_CHANGE_SUCCESS = '닉네임이 변경되었습니다.';
const MSG_ACCOUNT_NICKNAME_DUPLICATED = '이미 사용 중인 닉네임입니다.';
const MSG_ACCOUNT_NICKNAME_INVALID = '사용할 수 없는 닉네임입니다. 다시 확인해주세요.';
const MSG_ACCOUNT_NICKNAME_UNCHANGED = '현재 닉네임과 동일합니다.';
const MSG_ACCOUNT_NICKNAME_CHANGE_FAILED = '닉네임 변경에 실패했습니다. 다시 시도해주세요.';

export const useChangeNicknameMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const profileQueryKey = ['users', 'me', 'profile'];

  return useMutation({
    mutationFn: changeNickname,
    onMutate: async (newNicknamePayload) => {
      // 1. 낙관적 업데이트와 실제 fetch 결과의 혼선을 방지하기 위해 쿼리를 취소합니다.
      await queryClient.cancelQueries({ queryKey: profileQueryKey });

      // 2. 에러 시 롤백하기 위해 현재 캐시 데이터를 백업합니다.
      const previousProfile = queryClient.getQueryData<MyPageProfileResponse>(profileQueryKey);

      // 3. 새 닉네임으로 쿼리 데이터를 즉시(낙관적으로) 업데이트합니다.
      if (previousProfile) {
        queryClient.setQueryData<MyPageProfileResponse>(profileQueryKey, {
          ...previousProfile,
          nickname: newNicknamePayload.nickname,
        });
      }

      // 4. 에러 발생 시 onError에서 복구할 수 있도록 context를 반환합니다.
      return { previousProfile };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });

      addToast({
        description: MSG_ACCOUNT_NICKNAME_CHANGE_SUCCESS,
        type: 'success',
      });
    },
    onError: (error, _, context) => {
      // 5. 에러 발생 시 백업했던 원래 프로필 데이터로 캐시를 원상복구(Rollback)합니다.
      if (context?.previousProfile) {
        queryClient.setQueryData(profileQueryKey, context.previousProfile);
      }

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
    onSettled: () => {
      // 6. 성공/실패 여부 관계없이 최종적으로 서버 데이터와의 합치를 위해 쿼리를 무효화하여 최신화합니다.
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
};
