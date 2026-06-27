import type { ApiError, ApiResponse } from 'api.types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const FALLBACK_API_ERROR: ApiError = {
  code: 'COMMON_UNKNOWN_ERROR',
  message: '알 수 없는 오류가 발생했습니다.',
};

const NETWORK_API_ERROR: ApiError = {
  code: 'COMMON_NETWORK_ERROR',
  message: '네트워크 연결을 확인해 주세요.',
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Axios 체인 밖에서 발생한 예외
    if (!axios.isAxiosError<ApiResponse<unknown>>(error))
      return Promise.reject(Object.assign(new Error(FALLBACK_API_ERROR.message), FALLBACK_API_ERROR));

    const apiError = error.response?.data?.error;

    // BE가 ApiError envelope로 내려준 실패 응답
    if (apiError) return Promise.reject(Object.assign(new Error(apiError.message), apiError));

    // 네트워크 단절, CORS, non-JSON 응답처럼 ApiError envelope를 받지 못한 Axios 에러
    return Promise.reject(Object.assign(new Error(NETWORK_API_ERROR.message), NETWORK_API_ERROR));
  },
);
