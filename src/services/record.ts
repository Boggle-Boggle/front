import { BookCase } from 'types/book';
import { Note, RecordType } from 'types/record';

import api from '.';

export const addRecord = async (record: RecordType) => {
  const response = await api.post(`/reading-record`, record);

  return response.data.data as number;
};

export const getBookCase = async () => {
  const response = await api.get('/bookshelf');

  return response.data.data.books as BookCase[];
};

export const addNote = (recordId: number, note: Note) => {
  api.post(`/reading-record/${recordId}/note`, note);
};
