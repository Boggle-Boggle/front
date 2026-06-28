import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollObserverParams {
  enabled: boolean;
  onIntersect: () => unknown;
  threshold?: number;
}

export const useInfiniteScrollObserver = (params: UseInfiniteScrollObserverParams) => {
  const { enabled, onIntersect, threshold = 0.01 } = params;
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const [entry] = entries;

      if (!entry?.isIntersecting || !enabled) return;

      onIntersect();
    },
    [enabled, onIntersect],
  );

  useEffect(() => {
    const target = observerTarget.current;

    if (!target) return undefined;

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, threshold]);

  return { observerTarget };
};
