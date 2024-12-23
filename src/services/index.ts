import axios from 'axios';
import useAuthStore from 'stores/useAuthStore';

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
  (response) => {
    return response;
  },

  async (error) => {
    const { response, config } = error;
    const { login, logout } = useAuthStore.getState();

    if (response.status === 401) {
      try {
        const refreshResponse = await api.get('/auth/refresh');
        const newAccessToken = refreshResponse.data.data;
        const newConfig = { ...config };

        logout();
        login(newAccessToken);

        newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return await api(newConfig);
      } catch (err) {
        // TODO : 로그인 재시도 안내 구현

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
