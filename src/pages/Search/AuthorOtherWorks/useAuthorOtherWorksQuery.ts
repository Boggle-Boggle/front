import { useQuery } from '@tanstack/react-query';

import { TIME_MS } from 'constants/time';

import { getAuthorRecommendation } from './api';

export const useAuthorOtherWorksQuery = () => {
  return useQuery({
    queryKey: ['books', 'recommendations', 'by-author'],
    queryFn: getAuthorRecommendation,
    staleTime: TIME_MS.MINUTE_10,
  });
};
