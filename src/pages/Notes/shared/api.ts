import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface PageResponse {
  startPage: number;
  endPage: number | null;
}

export interface NoteTagBriefResponse {
  id: number;
  name: string;
}

export interface ReadingNoteResponse {
  id: number;
  readingLogId: number | null;
  title: string;
  body: string;
  page: PageResponse | null;
  tags: NoteTagBriefResponse[];
  createdAt: string;
}

export const getReadingLogNotes = async (readingLogId: string | number) => {
  const response = await api.get<ApiSuccessResponse<ReadingNoteResponse[]>>(`/v2/reading-logs/${readingLogId}/notes`);
  return response.data.data;
};

export interface CreateNoteRequest {
  title: string;
  body: string;
  page?: PageResponse | null;
  tagIds?: number[];
}

export const createReadingNote = async (readingLogId: string | number, data: CreateNoteRequest) => {
  const response = await api.post<ApiSuccessResponse<{ id: number }>>(`/v2/reading-logs/${readingLogId}/notes`, data);
  return response.data.data;
};

export const getReadingNote = async (noteId: string | number) => {
  const response = await api.get<ApiSuccessResponse<ReadingNoteResponse>>(`/v2/reading-notes/${noteId}`);
  return response.data.data;
};

export interface UpdateNoteRequest {
  title: string;
  body: string;
  page?: PageResponse | null;
  tagIds: number[];
}

export const updateReadingNote = async (noteId: string | number, data: UpdateNoteRequest) => {
  const response = await api.put<ApiSuccessResponse<{ id: number }>>(`/v2/reading-notes/${noteId}`, data);
  return response.data.data;
};

export const deleteReadingNote = async (noteId: string | number) => {
  await api.delete<void>(`/v2/reading-notes/${noteId}`);
};
