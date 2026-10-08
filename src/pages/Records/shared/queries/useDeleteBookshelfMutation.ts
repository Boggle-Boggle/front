import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { BOOKSHELVES_QUERY_KEY, deleteBookshelf } from '../api';

const MSG_DELETE_BOOKSHELF_FAILED = '그룹을 삭제하지 못했어요. 다시 시도해 주세요.';

type UseDeleteBookshelfMutationParams = {
  onSuccess?: (bookshelfId: number) => void;
};

export const useDeleteBookshelfMutation = (params: UseDeleteBookshelfMutationParams = {}) => {
  const { onSuccess } = params;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteBookshelf,
    onSuccess: (_, bookshelfId) => {
      onSuccess?.(bookshelfId);
      queryClient.invalidateQueries({ queryKey: BOOKSHELVES_QUERY_KEY });
    },
    onError: () => addToast({ description: MSG_DELETE_BOOKSHELF_FAILED, type: 'error' }),
  });
};
