import { useQuery } from '@tanstack/react-query';

import { getAuthorOtherWorks } from './api';

export const useAuthorOtherWorksQuery = (authorName: string) => {
  return useQuery({
    queryKey: ['books', 'authorOtherWorks', authorName],
    queryFn: () => getAuthorOtherWorks(authorName),
    enabled: Boolean(authorName),
  });
};
