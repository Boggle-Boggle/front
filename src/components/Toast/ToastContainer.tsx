import { useLayoutEffect, useRef } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { TIME_MS } from 'constants/time';

import { Toast } from '.';

export const ToastContainer = () => {
  const { toasts } = useToastStore();
  const toastElementByIdRef = useRef(new Map<string, HTMLDivElement>());
  const toastRectByIdRef = useRef(new Map<string, DOMRect>());

  useLayoutEffect(() => {
    const previousRectById = toastRectByIdRef.current;
    const nextRectById = new Map<string, DOMRect>();

    toasts.forEach((toast) => {
      const element = toastElementByIdRef.current.get(toast.id);
      if (!element) return;

      const nextRect = element.getBoundingClientRect();
      const previousRect = previousRectById.get(toast.id);
      nextRectById.set(toast.id, nextRect);

      if (!previousRect) return;

      const deltaY = previousRect.top - nextRect.top;
      if (deltaY === 0) return;

      element.style.transition = 'none';
      element.style.transform = `translateY(${deltaY}px)`;

      requestAnimationFrame(() => {
        element.style.transition = `transform ${TIME_MS.MS_300}ms ease-out`;
        element.style.transform = '';
      });
    });

    toastRectByIdRef.current = nextRectById;
  }, [toasts]);

  return (
    <section className="fixed bottom-[4.5rem] z-toast flex w-full max-w-mobile flex-col gap-1 px-mobile">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            ref={(element) => {
              if (element) {
                toastElementByIdRef.current.set(toast.id, element);
                return;
              }

              toastElementByIdRef.current.delete(toast.id);
            }}
          >
            <Toast {...toast} />
          </div>
        );
      })}
    </section>
  );
};
