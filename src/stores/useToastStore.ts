import { ToastProps } from 'components/refactor/Toast';
import { create } from 'zustand';

type Toast = ToastProps & { id: string };

type ToastStoreType = {
  toasts: Toast[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStoreType>((set, get) => ({
  toasts: [],
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  addToast: (toast) => {
    const id = crypto.randomUUID();
    const newToast = { ...toast, id };

    // 토스트 상태 변경
    set((state) => ({ toasts: [...state.toasts.slice(-2), newToast] }));

    // 3초 뒤 삭제
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },
}));
