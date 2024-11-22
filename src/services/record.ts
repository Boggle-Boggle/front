import { Library } from 'types/library';
import { RecordType } from 'types/record';

import api from '.';

export const getLibrary = async () => {
  const response = await api.get(`/libraries`);

  return response.data.data as Library[];
};

export const addRecord = (record: RecordType) => {
  api.post(`/reading-record`, record);
};
