import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { BOOKSHELVES_QUERY_KEY, createBookshelf } from '../api';

const MSG_CREATE_BOOKSHELF_FAILED = '그룹을 저장하지 못했습니다. 다시 시도해주세요.';

type UseCreateBookshelfMutationParams = {
  onSuccess?: () => void;
};

export const useCreateBookshelfMutation = (params: UseCreateBookshelfMutationParams = {}) => {
  const { onSuccess } = params;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createBookshelf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKSHELVES_QUERY_KEY });
      onSuccess?.();
    },
    onError: () => addToast({ description: MSG_CREATE_BOOKSHELF_FAILED, type: 'error' }),
  });
};
