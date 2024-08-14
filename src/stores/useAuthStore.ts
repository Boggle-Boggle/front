import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getSessionItem, removeSessionItem, setSessionItem } from 'utils/sessions';

type AuthStoreType = {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticated: !!getSessionItem('accessToken'),
      login: (accessToken) => {
        set({ isAuthenticated: true });
        setSessionItem('accessToken', accessToken);
      },
      logout: () => {
        set({ isAuthenticated: false });
        removeSessionItem('accessToken');
      },
    }),
    { name: 'auth-store' },
  ),
);

export default useAuthStore;
