import { useRef, useState } from 'react';

const useInput = () => {
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    setInput('');
    inputRef.current?.focus();
  };

  return { input, setInput, inputRef, clear };
};

export default useInput;
