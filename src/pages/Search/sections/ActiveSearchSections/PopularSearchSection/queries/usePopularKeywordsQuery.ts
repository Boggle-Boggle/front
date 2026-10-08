import { useQuery } from '@tanstack/react-query';

import { getPopularKeywords } from '../api';

export const usePopularKeywordsQuery = () => {
  return useQuery({
    queryKey: ['discovery', 'popular-keywords'],
    queryFn: getPopularKeywords,
  });
};
