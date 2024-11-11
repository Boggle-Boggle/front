import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const open = () => {
    setScrollPos(window.scrollY);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, open, close, scrollPos };
};

export default useModal;
