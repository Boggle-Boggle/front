import { useEffect, useState } from 'react';

const KEYBOARD_ACTIVE_VIEWPORT_RATIO = 0.85;

const getVisualViewportBottomInset = () => {
  if (!window.visualViewport) return 0;

  const bottomInset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;

  return Math.max(0, Math.round(bottomInset));
};

export const useKeyboard = () => {
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const [visualViewportHeight, setVisualViewportHeight] = useState<number>(window.visualViewport?.height ?? window.innerHeight);
  const [bottomInset, setBottomInset] = useState<number>(0);

  useEffect(() => {
    if (initialHeight === null) {
      setInitialHeight(window.innerHeight);
    }

    const handleViewportChange = () => {
      if (!initialHeight) return;
      if (window.visualViewport?.height === undefined) return;

      setVisualViewportHeight(window.visualViewport.height);
      setBottomInset(getVisualViewportBottomInset());
    };

    handleViewportChange();

    window.visualViewport?.addEventListener('resize', handleViewportChange);
    window.visualViewport?.addEventListener('scroll', handleViewportChange);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
      window.visualViewport?.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [initialHeight]);

  const isKeyboardActive = visualViewportHeight < (initialHeight ?? window.innerHeight) * KEYBOARD_ACTIVE_VIEWPORT_RATIO;

  return { isKeyboardActive, bottomInset };
};
