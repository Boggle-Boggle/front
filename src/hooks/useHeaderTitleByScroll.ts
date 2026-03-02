import { RefObject, useEffect, useState } from 'react';

type UseHeaderTitleByScrollProps = {
  rootRef: RefObject<HTMLDivElement | null>;
  targetRef: RefObject<HTMLDivElement | null>;
};

export const useHeaderTitleByScroll = (props: UseHeaderTitleByScrollProps) => {
  const { rootRef, targetRef } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const rootElement = rootRef.current;
    const targetElement = targetRef.current;

    if (!rootElement || !targetElement) {
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (!entry) {
            return;
          }

          setIsVisible(!entry.isIntersecting);
        },
        {
          root: rootElement,
          threshold: 0,
        },
      );

      observer.observe(targetElement);

      return () => {
        observer.disconnect();
      };
    }

    const handleScroll = () => {
      const rootTop = rootElement.getBoundingClientRect().top;
      const targetTop = targetElement.getBoundingClientRect().top;

      setIsVisible(targetTop <= rootTop);
    };

    rootElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      rootElement.removeEventListener('scroll', handleScroll);
    };
  }, [rootRef, targetRef]);

  return { isVisible };
};
