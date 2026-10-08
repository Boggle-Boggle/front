import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRecentSearch } from '../api';

export const useRemoveRecentSearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', 'recent-searches'] });
    },
  });
};
