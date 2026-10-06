import { useQuery } from '@tanstack/react-query';

import { getRecentSearches } from '../api';

export const useRecentSearchesQuery = () => {
  return useQuery({
    queryKey: ['books', 'recent-searches'],
    queryFn: getRecentSearches,
  });
};
