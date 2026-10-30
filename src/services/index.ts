import axios from 'axios';
import useAuthStore from 'stores/useAuthStore';

import CustomError from 'utils/customError';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

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
  (response) => response,
  (error) => {
    const { response } = error;
    const { logout } = useAuthStore.getState();
    const code = response?.data?.code;

    logout();

    // 게스트로그인
    if (code === 13001) {
      const newCustomError = new CustomError('탈퇴한 회원입니다. 회원가입을 다시 진행해주세요', error) as Error;

      return Promise.reject(newCustomError);
    }

    // 탈퇴유저
    if (code === 16003) {
      const newCustomError = new CustomError('약관에 동의하지 않았어요. 회원가입을 다시 진행해주세요', error) as Error;

      return Promise.reject(newCustomError);
    }

    if (response?.status === 401) {
      const newCustomError = new CustomError('로그인 기한이 만료되었어요. 다시 로그인 해주세요', error) as Error;

      return Promise.reject(newCustomError);
    }

    return Promise.reject(error);
  },
);
export default api;
