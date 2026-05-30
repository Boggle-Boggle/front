export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
  traceId?: string;
};

export type PageMeta = {
  page: number;
  size: number;
  total: number;
};

export type ApiMeta = {
  serverTime: string;
  page?: PageMeta;
};

export type ApiResponse<T> = {
  data: T | null;
  error?: ApiError;
  meta: ApiMeta;
};

export type Response<T> = ApiResponse<T>;

export type PaginationResponse<T> = {
  pageNum: number;
  totalResultCnt: number;
  itemsPerPage: number;
  items: T;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  meta: ApiMeta & {
    page: PageMeta;
  };
};
