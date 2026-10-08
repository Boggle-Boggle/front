import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRecentSearch } from '../api';

export const useClearRecentSearchesMutation = (keywords: string[], onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await Promise.all(keywords.map((keyword) => deleteRecentSearch(keyword)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', 'recent-searches'] });
      onSuccess?.();
    },
  });
};
