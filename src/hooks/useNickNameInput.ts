import { useState } from 'react';

const useNickNameInput = () => {
  const [message, setMessage] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateNickName = (name: string) => {
    // 벨리데이션 체크

    // 중복체크
    // if ('중복확인') {
    //   setMessage('이미 사용중인 닉네임이에요');
    //   setIsValid(false);
    //   return false;
    // }

    setMessage('️사용 가능한 닉네임이에요!');
    setIsValid(true);
    return true;
  };

  return { message, isValid, validateNickName };
};

export default useNickNameInput;
