import { useQuery } from '@tanstack/react-query';

import { getMe } from './api';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  });
};
