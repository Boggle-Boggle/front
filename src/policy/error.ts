import { isApiError } from 'api.types';

// 에러 처리 책임은 아래 기준으로 나눕니다.
// - 공통 실패: RouteErrorFallback에서 처리합니다.
// - 인증 실패: PrivateRoute에서 로그인 흐름으로 처리합니다.
// - 리소스 없음: 각 페이지에서 화면 맥락에 맞게 처리합니다.

export type ErrorMessage = {
  title: string;
  description: string;
};

export const CLIENT_REQUEST_FAILED_CODE = 'CLIENT_REQUEST_FAILED';

export const ROUTE_ERROR_CODES = [CLIENT_REQUEST_FAILED_CODE, 'COMMON_INTERNAL_ERROR', 'AUTH_FORBIDDEN'] as const;

export const AUTH_REQUIRED_ERROR_CODES = [
  'AUTH_TOKEN_MISSING',
  'AUTH_TOKEN_EXPIRED',
  'AUTH_TOKEN_INVALID',
  'AUTH_REFRESH_INVALID',
] as const;

export const ERROR_MESSAGE_BY_CODE = {
  [CLIENT_REQUEST_FAILED_CODE]: {
    title: '요청을 처리하지 못했어요',
    description: '잠시 후 다시 시도해주세요.',
  },
  COMMON_INTERNAL_ERROR: {
    title: '문제가 발생했어요',
    description: '잠시 후 다시 시도해주세요.',
  },
  AUTH_FORBIDDEN: {
    title: '접근할 수 없어요',
    description: '이 페이지를 볼 수 있는 권한이 없어요.',
  },
} satisfies Record<(typeof ROUTE_ERROR_CODES)[number], ErrorMessage>;

export const DEFAULT_ROUTE_ERROR_MESSAGE = {
  title: '문제가 발생했어요',
  description: '잠시 후 다시 시도해주세요.',
} satisfies ErrorMessage;

// 공통 실패로 분류한 query 에러만 RouteErrorFallback으로 전달합니다.
export const shouldThrowToErrorBoundary = (error: unknown) => {
  if (!isApiError(error)) return true;

  return ROUTE_ERROR_CODES.some((code) => code === error.code);
};

// refresh/retry 이후에도 인증이 복구되지 않아 로그인 처리가 필요한 에러인지 판단합니다.
export const shouldHandleAsAuthRequired = (error: unknown) => {
  if (!isApiError(error)) return false;

  return AUTH_REQUIRED_ERROR_CODES.some((code) => code === error.code);
};

export const getRouteErrorMessage = (error: unknown) => {
  if (!isApiError(error)) return DEFAULT_ROUTE_ERROR_MESSAGE;

  const routeErrorCode = ROUTE_ERROR_CODES.find((code) => code === error.code);

  if (!routeErrorCode) return DEFAULT_ROUTE_ERROR_MESSAGE;

  return ERROR_MESSAGE_BY_CODE[routeErrorCode];
};
