import { useQueryClient } from '@tanstack/react-query';

import type { InterestedBookSort } from '../api';

export const useInvalidateWishlistQuery = (searchKeyword: string) => {
  const queryClient = useQueryClient();

  return (sortType: InterestedBookSort) => {
    queryClient.invalidateQueries({ queryKey: ['interested-books', 'library', searchKeyword.trim(), sortType] });
  };
};
