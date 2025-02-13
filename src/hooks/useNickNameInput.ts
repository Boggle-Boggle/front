import { useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';

import { isDuplicateNickname, updateNickname } from 'services/user';

const useNickNameInput = (
  initNickName: string,
  handleAlertActive: React.DispatchWithoutAction,
  successChange: () => void,
) => {
  const [nickName, setNickName] = useState<string>(initNickName);

  const queryClient = useQueryClient();

  const changeNickName = async (name: string) => {
    if (name.length > 12) return;
    setNickName(name);
  };

  const saveNickName = async () => {
    const trimmedNickName = nickName.trim();

    const isDuplicated = await isDuplicateNickname(trimmedNickName);

    if (isDuplicated) {
      handleAlertActive();
      return;
    }
    await updateNickname(trimmedNickName);

    queryClient.invalidateQueries({ queryKey: ['myPage'] });

    successChange();
  };

  return { nickName, saveNickName, changeNickName };
};

export default useNickNameInput;
