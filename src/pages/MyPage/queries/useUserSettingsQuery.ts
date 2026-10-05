import { useQuery } from '@tanstack/react-query';

import { getUserSettings } from '../Content/api';

export const useUserSettingsQuery = () => {
  return useQuery({
    queryKey: ['users', 'me', 'settings'],
    queryFn: getUserSettings,
  });
};
