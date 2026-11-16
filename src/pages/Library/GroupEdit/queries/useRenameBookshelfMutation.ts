import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { BOOKSHELVES_QUERY_KEY } from 'pages/Records/shared/api';

import { renameBookshelf } from '../api';

const MSG_RENAME_BOOKSHELF_FAILED = '그룹 이름을 수정하지 못했어요. 다시 시도해 주세요.';

type UseRenameBookshelfMutationParams = {
  onSuccess?: () => void;
};

export const useRenameBookshelfMutation = (params: UseRenameBookshelfMutationParams = {}) => {
  const { onSuccess } = params;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: renameBookshelf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKSHELVES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['reading-logs', 'summary'] });
      onSuccess?.();
    },
    onError: () => addToast({ description: MSG_RENAME_BOOKSHELF_FAILED, type: 'error' }),
  });
};
