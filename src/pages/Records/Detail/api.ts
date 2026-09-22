import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { AddRecordStatus, ReadingLogProgressType, Book } from 'types';

export interface BookInfo
  extends Pick<Book, 'title' | 'author' | 'publisher' | 'coverUrl' | 'description' | 'isAdult'> {
  category: string | null;
  publishedDate: string | null;
  isbn13: string | null;
}

export interface Progress {
  type: ReadingLogProgressType;
  value: number;
  totalPages: number;
  percentage: number;
}

export interface BookshelfSummary {
  id: number;
  name: string;
}

export interface ReadingLogInfo {
  status: AddRecordStatus;
  rating: number;
  noteCount: number;
  progress: Progress | null;
  startDate: string;
  endDate: string | null;
  bookshelves: BookshelfSummary[];
  isHidden: boolean;
}

export interface ReadingLogDetailResponse {
  id: number;
  book: BookInfo;
  readingLog: ReadingLogInfo;
  hideAdultContent: boolean;
}

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

export const getReadingLogDetail = async (id: string | number) => {
  const response = await api.get<ApiSuccessResponse<ReadingLogDetailResponse>>(`/v2/reading-logs/${id}`);
  return response.data.data;
};

export const getReadingLogNotes = async (readingLogId: string | number) => {
  const response = await api.get<ApiSuccessResponse<ReadingNoteResponse[]>>(`/v2/reading-logs/${readingLogId}/notes`);
  return response.data.data;
};

export interface CreateNoteRequest {
  title: string;
  body: string;
  page?: PageResponse | null;
  tags?: string[];
}

export const createReadingNote = async (readingLogId: string | number, data: CreateNoteRequest) => {
  const response = await api.post<ApiSuccessResponse<ReadingNoteResponse>>(
    `/v2/reading-logs/${readingLogId}/notes`,
    data,
  );
  return response.data.data;
};

export const deleteReadingNote = async (noteId: string | number) => {
  await api.delete<void>(`/v2/reading-notes/${noteId}`);
};

export const deleteReadingLog = async (id: string | number) => {
  await api.delete(`/v2/reading-logs/${id}`);
};

export interface UpdateReadingLogRequest {
  status: AddRecordStatus;
  rating: number;
  startDate: string;
  endDate: string | null;
  progressType?: ReadingLogProgressType;
  progressValue?: number;
  totalPagesOverride?: number;
  bookshelfIds: number[];
  isHidden: boolean;
}

export const updateReadingLog = async (id: string | number, data: UpdateReadingLogRequest) => {
  const response = await api.put<ApiSuccessResponse<void>>(`/v2/reading-logs/${id}`, data);
  return response.data.data;
};
