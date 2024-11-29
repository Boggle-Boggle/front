import { useState } from 'react';

const useNickNameInput = () => {
  const [nickName, setNickName] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const updateNickName = (name: string) => {
    if (name.length > 15) return;
    if (name.length === 0) setIsValid(false);
    else setIsValid(true);

    setNickName(name);
  };

  return { nickName, setNickName, isValid, updateNickName };
};

export default useNickNameInput;
