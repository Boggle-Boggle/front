import useToastStore from 'stores/useToastStore';

import { Toast } from '.';

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <section className="fixed bottom-[4.5rem] z-toast flex w-full max-w-mobile flex-col px-mobile">
      {toasts.map((toast) => {
        return (
          <div key={toast.id} className="mt-1">
            <Toast {...toast} />
          </div>
        );
      })}
    </section>
  );
};
