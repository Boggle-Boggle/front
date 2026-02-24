/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useAuthStore from 'stores/useAuthStore';

const MSG_API_NETWORK_ERROR = '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
const MSG_API_FORBIDDEN = '접근 권한이 없습니다.';
const MSG_API_SERVER_ERROR = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
const MSG_API_NOT_FOUND = '요청하신 리소스를 찾을 수 없습니다.';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const { accessToken } = useAuthStore.getState();

    if (import.meta.env.DEV) console.log(`[API Req] ${config.method?.toUpperCase()} ${config.url}`);
    if (accessToken) newConfig.headers.Authorization = `Bearer ${accessToken}`;

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (!error.response) {
      console.error(MSG_API_NETWORK_ERROR);
      return Promise.reject(error);
    }

    const { status } = error.response;

    switch (status) {
      case 403:
        console.error(MSG_API_FORBIDDEN);
        break;
      case 404:
        console.error(MSG_API_NOT_FOUND);
        break;
      case 500:
        console.error(MSG_API_SERVER_ERROR);
        break;
      default:
        console.error(`API Error: ${status}`, error.message);
    }

    return Promise.reject(error);
  },
);
