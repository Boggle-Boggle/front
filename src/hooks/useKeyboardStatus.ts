import { useEffect, useState } from 'react';

const useKeyboardStatus = () => {
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    if (initialHeight === null) {
      setInitialHeight(window.innerHeight);
    }

    const handleResize = () => {
      if (!initialHeight) return;
      if (window.visualViewport?.height === undefined) return;

      const isSmallViewport = window.visualViewport.height < initialHeight * 0.85;
      setIsKeyboardActive(isSmallViewport);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [initialHeight]);

  return isKeyboardActive;
};

export default useKeyboardStatus;
