import { create } from 'zustand';

import { ToastProps } from 'components/Toast';

type Toast = ToastProps & { id: string };
type ToastTimeouts = Record<string, ReturnType<typeof setTimeout>>;

type ToastStoreType = {
  toasts: Toast[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
};

const TOAST_DURATION_MS = 2400;
const toastTimeouts: ToastTimeouts = {};

export const useToastStore = create<ToastStoreType>((set, get) => ({
  toasts: [],
  removeToast: (id) => {
    if (toastTimeouts[id]) {
      clearTimeout(toastTimeouts[id]);
      delete toastTimeouts[id];
    }

    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  addToast: (toast) => {
    const id = crypto.randomUUID();
    const newToast = { ...toast, id };

    set((state) => ({ toasts: [...state.toasts.slice(-2), newToast] }));

    toastTimeouts[id] = setTimeout(() => {
      get().removeToast(id);
    }, TOAST_DURATION_MS);
  },
}));

export default useToastStore;
