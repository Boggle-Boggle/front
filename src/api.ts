import type { ApiError, ApiErrorResponse } from 'api.types';
import axios, { type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const AUTH_REFRESH_PATH = '/v2/auth/refresh';

const FALLBACK_API_ERROR: ApiError = {
  code: 'COMMON_UNKNOWN_ERROR',
  message: '알 수 없는 오류가 발생했습니다.',
};

const NETWORK_API_ERROR: ApiError = {
  code: 'COMMON_NETWORK_ERROR',
  message: '네트워크 연결을 확인해 주세요.',
};

export const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== 'object' || error === null) return false;

  if (!('code' in error) || !('message' in error)) return false;

  const { code, message } = error;

  return typeof code === 'string' && typeof message === 'string';
};

const createApiError = (apiError: ApiError) => Object.assign(new Error(apiError.message), apiError);

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 여러 요청이 동시에 401을 받아도 refresh 요청은 하나만 보냅니다.
// 이미 진행 중인 refresh Promise가 있으면 새 요청을 만들지 않고 같은 Promise를 기다립니다.
const pendingAuthRefreshRequest: { current: Promise<void> | null } = {
  current: null,
};

// refresh 이후에도 같은 요청이 다시 401을 받으면 더 이상 재시도하지 않습니다.
// 같은 요청을 계속 refresh/retry 하면 무한 루프가 될 수 있기 때문입니다.
const authRefreshRetriedConfigs = new WeakSet<InternalAxiosRequestConfig>();

const refreshAuth = async () => {
  // 이미 다른 요청이 refresh 중이면 새 refresh를 만들지 않고 같은 요청이 끝날 때까지 기다립니다.
  if (pendingAuthRefreshRequest.current) {
    await pendingAuthRefreshRequest.current;

    return;
  }

  // refresh 응답 body는 사용하지 않고, 성공 시 Set-Cookie로 갱신되는 인증 쿠키만 필요합니다.
  const request = axios
    .post(AUTH_REFRESH_PATH, undefined, {
      baseURL: API_BASE_URL,
      withCredentials: true,
    })
    .then(() => undefined);

  // 뒤이어 들어오는 401 요청들이 같은 refresh Promise를 기다릴 수 있도록 저장합니다.
  pendingAuthRefreshRequest.current = request;

  try {
    await request;
  } finally {
    // 현재 기다린 refresh가 아직 최신 요청이면 비워서 다음 401 때 새 refresh를 만들 수 있게 합니다.
    if (pendingAuthRefreshRequest.current === request) pendingAuthRefreshRequest.current = null;
  }
};

// 이 인터셉터는 인증 만료 복구만 담당합니다.
api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    // Axios 에러가 아니면 HTTP 상태와 원 요청 정보를 알 수 없으므로 다음 에러 인터셉터로 넘깁니다.
    if (!axios.isAxiosError<ApiErrorResponse>(error)) return Promise.reject(error);

    // 401이 아닌 에러는 refresh 대상이 아니므로 다음 에러 인터셉터로 넘깁니다.
    if (error.response?.status !== 401) return Promise.reject(error);

    // 원 요청 config가 없으면 같은 요청을 다시 보낼 수 없으므로 다음 에러 인터셉터로 넘깁니다.
    if (!error.config) return Promise.reject(error);

    // refresh 후 재시도한 요청이 또 401이면 무한 루프를 막기 위해 한 번 더 시도하지 않습니다.
    if (authRefreshRetriedConfigs.has(error.config)) return Promise.reject(error);

    // refresh가 성공하면 HttpOnly 쿠키가 갱신되므로, 원래 실패했던 요청을 그대로 다시 보냅니다.
    authRefreshRetriedConfigs.add(error.config);
    await refreshAuth();

    return api.request(error.config);
  },
);

// refresh/retry로 복구되지 않은 에러는 여기까지 내려옵니다.
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // 화면과 query/mutation에서는 AxiosError 대신 ApiError(code, message)만 다루도록 통일합니다.
    if (!axios.isAxiosError<ApiErrorResponse>(error)) {
      return Promise.reject(createApiError(FALLBACK_API_ERROR));
    }

    const apiError = error.response?.data?.error;

    if (apiError) return Promise.reject(createApiError(apiError));

    return Promise.reject(createApiError(NETWORK_API_ERROR));
  },
);
