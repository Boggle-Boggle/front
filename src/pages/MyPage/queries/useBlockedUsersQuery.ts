import { useQuery } from '@tanstack/react-query';

import { getMyBlocks } from '../Content/api';

export const useBlockedUsersQuery = () => {
  return useQuery({
    queryKey: ['users', 'me', 'blocks'],
    queryFn: () => getMyBlocks(),
  });
};
