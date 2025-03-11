import axios from 'axios';
import useAuthStore from 'stores/useAuthStore';
import { create } from 'zustand';

import CustomError from 'utils/Error';

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

    const { code } = response.data;
    if (response.status === 401) {
      // 4번의 재시도 후 종료
      if (retryCount < 4) {
        incrementRetry();

        try {
          const refreshResponse = await api.get('/auth/refresh');
          const newAccessToken = refreshResponse.data.data;

          // logout();
          login(newAccessToken);

          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return await api(config);
        } catch (err) {
          resetRetry();

          return Promise.reject(err);
        }
      } //
      else {
        logout();

        const newCustomError = new CustomError('로그인 기한이 만료되었어요. 다시 로그인 해주세요', error) as Error;

        return Promise.reject(newCustomError);
      }
    }

    // 게스트로그인
    if (code === 13001) {
      logout();

      const newCustomError = new CustomError('탈퇴한 회원입니다. 회원가입을 다시 진행해주세요', error) as Error;

      return Promise.reject(newCustomError);
    }

    // 탈퇴유저
    if (code === 16003) {
      logout();

      const newCustomError = new CustomError('약관에 동의하지 않았어요. 회원가입을 다시 진행해주세요', error) as Error;

      return Promise.reject(newCustomError);
    }

    return Promise.reject(error);
  },
);
export default api;
