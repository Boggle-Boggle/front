import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserSettings } from '../Content/api';

export const useUpdateUserSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(['users', 'me', 'settings'], updatedSettings);
    },
  });
};
