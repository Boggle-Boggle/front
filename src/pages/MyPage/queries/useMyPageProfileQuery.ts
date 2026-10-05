import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getMyPageProfile } from '../api';

export const useMyPageProfileQuery = () => {
  return useQuery({
    queryKey: ['users', 'me', 'profile'],
    queryFn: getMyPageProfile,
    retry: false,
    throwOnError: shouldThrowToErrorBoundary,
  });
};
