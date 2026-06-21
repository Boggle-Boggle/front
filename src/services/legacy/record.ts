import { BookCase } from 'types/book';
import { AddNoteParams, RecordType, Record, Notes, RecordDate, EditRecord, UpdateRecordParams } from 'types/legacy/record';
import { Response } from 'types/legacy/api';

import { api } from 'services/index';

export const addRecord = async (record: RecordType) => {
  const response = await api.post<Response<number>>(`/reading-record`, record);

  return response.data;
};

export const getRecord = async (recordId: string) => {
  const response = await api.get<Response<Record>>(`/reading-record/${recordId}`);

  return response.data;
};

export const deleteRecord = async (recordId: number) => {
  await api.delete(`/reading-record/${recordId}`);
};

export const getBookCase = async (year?: number | null, month?: number | null) => {
  const queryString = new URLSearchParams();

  if (year) queryString.append('year', `20${year.toString().padStart(2, '0')}`);
  if (month && month !== 13) queryString.append('month', month.toString());

  const response = await api.get<{ books: BookCase[] }>(`/bookshelf?${queryString.toString()}`);

  return response.data.books;
};

export const addNote = async (recordId: number, note: AddNoteParams) => {
  await api.post(`/reading-record/${recordId}/note`, note);
};

export const updateNote = async (recordId: number, noteId: number, note: Partial<AddNoteParams>) => {
  await api.patch(`/reading-record/${recordId}/note/${noteId}`, note);
};

export const getNote = async (recordId: string) => {
  const response = await api.get<Response<Notes[]>>(`/reading-record/${recordId}/note`);

  return response.data;
};

export const deleteNote = async (recordId: number, noteId: number) => {
  await api.delete(`/reading-record/${recordId}/note/${noteId}`);
};

export const getReadDates = async (recordId: string) => {
  const response = await api.get<Response<(RecordDate & { readDateIndex: number })[]>>(
    `/reading-record/${recordId}/read-dates`,
  );

  return response.data;
};

export const getEditRecord = async (recordId: string) => {
  const response = await api.get<Response<EditRecord>>(`/reading-record/${recordId}/edit`);

  return response.data;
};

export const updateEditRecord = async (recordId: number, record: UpdateRecordParams) => {
  await api.patch(`/reading-record/${recordId}`, record);
};
