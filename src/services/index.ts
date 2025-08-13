import axios from 'axios';
import useAuthStore from 'stores/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 2000,
  withCredentials: true,
});

// refactor : 매번 헤더 세팅하는 방식 대신 리프레시 호출시에만 세팅하는 방식으로
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

api.interceptors.response.use((response) => {
  return response.data;
});
export default api;
