import axios from 'axios';

import { getSessionItem } from 'utils/sessions';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const accessToken = getSessionItem('accessToken');

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      newConfig.withCredentials = true;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
