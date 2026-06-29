import type { ApiError, ApiErrorResponse, ApiSuccessResponse, PageMeta, PaginationMockResponse } from 'api.types';

export type { ApiError, ApiErrorResponse, ApiSuccessResponse, PageMeta, PaginationMockResponse };

export type ApiMeta = ApiSuccessResponse['meta'];
export type ApiResponse<TData = null> = ApiSuccessResponse<TData> | ApiErrorResponse;
export type Response<TData = null> = TData;
export type PaginatedResponse<TData> = ApiSuccessResponse<TData>;
export type PaginationResponse<TItems = unknown> = PaginationMockResponse<TItems>;
