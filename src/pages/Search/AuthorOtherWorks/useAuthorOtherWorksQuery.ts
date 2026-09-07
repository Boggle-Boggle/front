import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from 'constants/index';

import { getAuthorRecommendation } from './api';

export const useAuthorOtherWorksQuery = () => {
  return useQuery({
    queryKey: ['books', 'recommendations', 'by-author'],
    queryFn: getAuthorRecommendation,
    staleTime: QUERY_STALE_TIME.MIN_10,
  });
};
