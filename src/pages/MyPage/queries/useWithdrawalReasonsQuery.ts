import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getWithdrawalReasons } from '../Account/api';

export const useWithdrawalReasonsQuery = () => {
  return useQuery({
    queryKey: ['users', 'me', 'withdrawal-reasons'],
    queryFn: getWithdrawalReasons,
    retry: false,
    throwOnError: shouldThrowToErrorBoundary,
  });
};
