export interface PageMeta {
  page: number;
  size: number;
  total: number;
}

interface ApiMeta {
  serverTime: string;
}

interface PaginatedMeta {
  serverTime: string;
  page: PageMeta;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  traceId?: string;
}

export const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== 'object' || error === null) return false;

  if (!('code' in error) || !('message' in error)) return false;

  const { code, message } = error;

  return typeof code === 'string' && typeof message === 'string';
};

export interface ApiSuccessResponse<TData = null> {
  data: TData;
  error: null;
  meta: ApiMeta;
}

export interface ApiErrorResponse {
  data: null;
  error: ApiError;
  meta: ApiMeta;
}

export interface PaginatedResponse<TData> {
  data: TData;
  error: null;
  meta: PaginatedMeta;
}
