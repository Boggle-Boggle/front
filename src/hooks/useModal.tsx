import { useState } from 'react';

const useModal = (initialStatus: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [scrollPos, setScrollPos] = useState(0);

  const open = () => {
    setScrollPos(window.scrollY);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, open, close, scrollPos };
};

export default useModal;
