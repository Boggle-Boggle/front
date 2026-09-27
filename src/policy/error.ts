import { isApiError } from 'api.types';

export type ErrorMessage = {
  title: string;
  description: string;
};

export const CLIENT_REQUEST_FAILED_CODE = 'CLIENT_REQUEST_FAILED';

export const ROUTE_ERROR_CODES = [
  CLIENT_REQUEST_FAILED_CODE,
  'COMMON_INTERNAL_ERROR',
  'AUTH_FORBIDDEN',
  'BOOK_NOT_FOUND',
  'READING_LOG_NOT_FOUND',
  'READING_NOTE_NOT_FOUND',
  'REVIEW_NOT_FOUND',
  'TERMS_NOT_FOUND',
] as const;

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
  BOOK_NOT_FOUND: {
    title: '도서를 찾을 수 없어요',
    description: '삭제되었거나 더 이상 볼 수 없는 도서예요.',
  },
  READING_LOG_NOT_FOUND: {
    title: '독서기록을 찾을 수 없어요',
    description: '삭제되었거나 접근할 수 없는 기록이에요.',
  },
  READING_NOTE_NOT_FOUND: {
    title: '독서노트를 찾을 수 없어요',
    description: '삭제되었거나 접근할 수 없는 노트예요.',
  },
  REVIEW_NOT_FOUND: {
    title: '리뷰를 찾을 수 없어요',
    description: '삭제되었거나 더 이상 볼 수 없는 리뷰예요.',
  },
  TERMS_NOT_FOUND: {
    title: '약관을 찾을 수 없어요',
    description: '삭제되었거나 더 이상 볼 수 없는 약관이에요.',
  },
} satisfies Record<(typeof ROUTE_ERROR_CODES)[number], ErrorMessage>;

export const DEFAULT_ROUTE_ERROR_MESSAGE = {
  title: '문제가 발생했어요',
  description: '잠시 후 다시 시도해주세요.',
} satisfies ErrorMessage;

// 페이지 핵심 데이터를 더 이상 렌더링할 수 없는 에러인지 판단합니다.
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
