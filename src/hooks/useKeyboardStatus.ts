import { useEffect, useState } from 'react';

const useKeyboardStatus = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport?.height === undefined) return;
      const isSmallViewport = window.visualViewport?.height < window.innerHeight || window.innerHeight < 700;
      setIsKeyboardActive(isSmallViewport);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isKeyboardActive;
};

export default useKeyboardStatus;
