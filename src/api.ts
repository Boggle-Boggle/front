import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Swagger 공통 error envelope 의 error 필드 shape.
export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
  traceId?: string;
};

// Swagger 공통 meta envelope.
export type ApiMeta = {
  serverTime: string;
};

// 모든 v2 API 가 따르는 공통 응답 envelope.
export type ApiEnvelope<T> = {
  data: T | null;
  error: ApiError | null;
  meta: ApiMeta;
};

// axios 구현 디테일을 바깥으로 직접 노출하지 않기 위한 앱 표준 에러 shape.
export type AppApiError = Error & {
  cause?: unknown;
  code: string | null;
  details?: unknown;
  status: number | null;
  traceId?: string;
};

// 요청 재시도 여부와 refresh 제외 여부를 request config 에 함께 실어 보낸다.
type ApiRequestConfig = AxiosRequestConfig & {
  retryAttempted?: boolean;
  skipAuthRefresh?: boolean;
};

const AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';

// 인증 플로우 자체인 endpoint 는 refresh 재시도 대상에서 제외한다.
const REFRESH_EXCLUDED_PATHS = new Set([
  '/v2/auth/refresh',
  '/v2/auth/logout',
  '/v2/auth/signup/complete',
  '/v2/auth/app/session',
  '/v2/auth/app/credential',
]);

// refresh 요청은 또 다른 refresh 로직에 걸리지 않도록 명시적으로 제외한다.
const REFRESH_REQUEST_CONFIG: ApiRequestConfig = {
  skipAuthRefresh: true,
};

const isRefreshExcludedPath = (url?: string) => {
  if (!url) return false;

  // OAuth 시작/콜백은 access token 만료 복구 대상이 아니라 인증 진입 플로우다.
  if (url.startsWith('/v2/auth/oauth/')) {
    return true;
  }

  return REFRESH_EXCLUDED_PATHS.has(url);
};

// 응답이 Swagger 공통 envelope 형식인지 최소한으로 판별한다.
const isApiEnvelope = (value: unknown): value is ApiEnvelope<unknown> => {
  if (typeof value !== 'object' || value === null) return false;

  return 'data' in value && 'error' in value && 'meta' in value;
};

// 인터셉터 바깥에서는 axios 원본 구조 대신 앱 공통 에러 객체만 다루게 만든다.
const normalizeApiError = (error: AxiosError): AppApiError => {
  const responseData = error.response?.data;
  const envelope = isApiEnvelope(responseData) ? responseData : null;
  const apiError = envelope?.error ?? null;

  const normalizedError = new Error(apiError?.message ?? error.message) as AppApiError;

  normalizedError.cause = error;
  normalizedError.code = apiError?.code ?? null;
  normalizedError.details = apiError?.details;
  normalizedError.status = error.response?.status ?? null;
  normalizedError.traceId = apiError?.traceId;

  return normalizedError;
};

// 공통 axios 인스턴스.
// 응답 envelope 는 유지하고, 인증 재시도 같은 횡단 처리만 맡긴다.
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

// 현재는 요청 단계에서 별도 헤더 주입 없이 config 그대로 통과시킨다.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => config);

api.interceptors.response.use(
  // 전역에서는 data 만 평탄화하지 않는다.
  // 각 페이지 api.ts 가 response.data 를 꺼낼지, meta 까지 볼지 선택하게 둔다.
  (response) => response.data,
  async (error: AxiosError) => {
    const requestConfig = error.config as ApiRequestConfig | undefined;
    const responseData = error.response?.data;
    const envelope = isApiEnvelope(responseData) ? responseData : null;
    const errorCode = envelope?.error?.code ?? null;
    const requestUrl = requestConfig?.url;

    // 보호 API 에서 access token 만료가 발생한 경우에만 refresh 를 1회 시도한다.
    // 그 외 인증 에러는 상위 플로우가 처리할 수 있도록 그대로 넘긴다.
    if (
      error.response?.status === 401 &&
      errorCode === AUTH_TOKEN_EXPIRED &&
      requestConfig &&
      !requestConfig.retryAttempted &&
      !requestConfig.skipAuthRefresh &&
      !isRefreshExcludedPath(requestUrl)
    ) {
      requestConfig.retryAttempted = true;

      try {
        // refresh 성공 시 원요청을 같은 config 로 한 번만 재실행한다.
        await api.post('/v2/auth/refresh', null, REFRESH_REQUEST_CONFIG);

        return await api(requestConfig);
      } catch (refreshError) {
        // refresh 자체가 실패하면 세션 복구 실패로 보고 공통 에러 객체로 넘긴다.
        if (refreshError instanceof AxiosError) {
          return Promise.reject(normalizeApiError(refreshError));
        }

        return Promise.reject(normalizeApiError(error));
      }
    }

    // refresh 대상이 아니거나, 일반 실패라면 공통 에러 객체만 반환한다.
    return Promise.reject(normalizeApiError(error));
  },
);
