import { Library } from 'types/library';

import api from '.';

export const getLibrary = async () => {
  const response = await api.get(`/libraries`);

  return response.data.data as Library[];
};
