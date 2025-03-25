import { BookCase } from 'types/book';
import { AddNoteParams, RecordType, Record, Notes, RecordDate, EditRecord, UpdateRecordParams } from 'types/record';

import api from '.';

export const addRecord = async (record: RecordType) => {
  const response = await api.post(`/reading-record`, record);

  return response.data.data as number;
};

export const getRecord = async (recordId: string) => {
  const response = await api.get(`/reading-record/${recordId}`);

  return response.data.data as Record;
};

export const deleteRecord = async (recordId: number) => {
  await api.delete(`/reading-record/${recordId}`);
};

export const getBookCase = async (year?: number | null, month?: number | null) => {
  const queryString = new URLSearchParams();

  if (year) queryString.append('year', `20${year.toString().padStart(2, '0')}`);
  if (month && month !== 13) queryString.append('month', month.toString());

  const response = await api.get(`/bookshelf?${queryString.toString()}`);

  return response.data.data.books as BookCase[];
};

export const addNote = async (recordId: number, note: AddNoteParams) => {
  await api.post(`/reading-record/${recordId}/note`, note);
};

export const updateNote = async (recordId: number, noteId: number, note: Partial<AddNoteParams>) => {
  await api.patch(`/reading-record/${recordId}/note/${noteId}`, note);
};

export const getNote = async (recordId: string) => {
  const response = await api.get(`/reading-record/${recordId}/note`);

  return response.data.data as Notes[];
};

export const deleteNote = async (recordId: number, noteId: number) => {
  await api.delete(`/reading-record/${recordId}/note/${noteId}`);
};

export const getReadDates = async (recordId: string) => {
  const response = await api.get(`/reading-record/${recordId}/read-dates`);

  return response.data.data as (RecordDate & { readDateIndex: number })[];
};

export const getEditRecord = async (recordId: string) => {
  const response = await api.get(`/reading-record/${recordId}/edit`);

  return response.data.data as EditRecord;
};

export const updateEditRecord = async (recordId: number, record: UpdateRecordParams) => {
  await api.patch(`/reading-record/${recordId}`, record);
};
