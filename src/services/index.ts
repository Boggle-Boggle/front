import axios from 'axios';
import useAuthStore from 'stores/useAuthStore';
import { create } from 'zustand';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

type RetryStore = {
  retryCount: number;
  incrementRetry: () => void;
  resetRetry: () => void;
};

const useRetryStore = create<RetryStore>((set) => ({
  retryCount: 0,
  incrementRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),
  resetRetry: () => set({ retryCount: 0 }),
}));

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const { response, config } = error;
    const { login, logout } = useAuthStore.getState();

    const { retryCount, incrementRetry, resetRetry } = useRetryStore.getState();

    if (response.status === 401 && retryCount < 3) {
      incrementRetry();

      try {
        const refreshResponse = await api.get('/auth/refresh');
        const newAccessToken = refreshResponse.data.data;

        logout();
        login(newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await api(config);
      } catch (err) {
        resetRetry();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
