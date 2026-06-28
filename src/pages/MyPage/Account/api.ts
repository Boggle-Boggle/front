import { api } from 'api';

export const createLogout = async () => {
  await api.post<void>('/v2/auth/logout');
};
