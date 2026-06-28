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

// 기존 mock 전용 호환 타입입니다. 신규 페이지 API 연동은 Swagger 기준의 PaginatedResponse<TData>를 사용합니다.
export interface PaginationMockResponse<TItems = unknown> {
  pageNum: number;
  totalResultCnt: number;
  itemsPerPage: number;
  items: TItems;
}
