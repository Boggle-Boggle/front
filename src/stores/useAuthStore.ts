import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreType = {
  accessToken: null | string;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      login: (accessToken) => {
        set({ accessToken, isAuthenticated: true });
      },
      logout: () => {
        set({ accessToken: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-store' },
  ),
);

export default useAuthStore;
