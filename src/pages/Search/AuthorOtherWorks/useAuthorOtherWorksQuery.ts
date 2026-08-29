import { useQuery } from '@tanstack/react-query';

import { getAuthorRecommendation } from './api';

export const useAuthorOtherWorksQuery = () => {
  return useQuery({
    queryKey: ['books', 'recommendations', 'by-author'],
    queryFn: getAuthorRecommendation,
  });
};
