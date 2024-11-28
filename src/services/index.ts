import axios from 'axios';
import { getSessionItem, removeSessionItem, setSessionItem } from 'utils/sessions';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const accessToken = getSessionItem('accessToken');

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

    if (response.status === 401) {
      try {
        const refreshResponse = await api.get('/auth/refresh');
        const newAccessToken = refreshResponse.data.data;
        const newConfig = { ...config };

        removeSessionItem('accessToken');
        setSessionItem('accessToken', newAccessToken);

        newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(newConfig);
      } catch (err) {
        // TODO : 로그인 재시도 안내 구현
        removeSessionItem('accessToken');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
