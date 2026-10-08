import { RefObject, useEffect, useId } from 'react';
import { useBottomOverlayStore } from 'stores/useBottomOverlayStore';

export const useBottomOverlayHeight = (elementRef: RefObject<HTMLElement>, enabled = true) => {
  const overlayId = useId();
  const { setOverlayHeight, removeOverlayHeight } = useBottomOverlayStore();

  useEffect(() => {
    const element = elementRef.current;

    if (!enabled || !element) {
      removeOverlayHeight(overlayId);
      return;
    }

    const updateOverlayHeight = () => {
      setOverlayHeight(overlayId, element.getBoundingClientRect().height);
    };

    updateOverlayHeight();

    const resizeObserver = new ResizeObserver(updateOverlayHeight);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      removeOverlayHeight(overlayId);
    };
  }, [elementRef, enabled, overlayId, removeOverlayHeight, setOverlayHeight]);
};
