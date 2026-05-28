import { AxiosRequestConfig } from 'axios';

import { api } from 'services/index';

import { ApiResponse } from 'types/api';
import { CompleteSignupPayload, AuthProvider } from 'types/auth';

const AUTH_ERROR_ROUTE = '/login';
type SkipAuthRefreshConfig = AxiosRequestConfig & {
  skipAuthRefresh: true;
};

const SKIP_AUTH_REFRESH_CONFIG: SkipAuthRefreshConfig = {
  skipAuthRefresh: true,
};

const getAuthReturnUrl = () => {
  if (typeof window === 'undefined') {
    return '/auth';
  }

  return new URL('/auth', window.location.origin).toString();
};

export const getOAuthStartUrl = (provider: AuthProvider) => {
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

  if (!serverBaseUrl) {
    throw new Error('VITE_SERVER_BASE_URL is not configured.');
  }

  const returnUrl = encodeURIComponent(getAuthReturnUrl());

  return `${serverBaseUrl}/v2/auth/oauth/${provider}/start?returnUrl=${returnUrl}`;
};

export const startOAuthLogin = (provider: AuthProvider) => {
  if (typeof window === 'undefined') return;

  window.location.href = getOAuthStartUrl(provider);
};

export const completeSignup = async (payload: CompleteSignupPayload) => {
  const response = await api.post<ApiResponse<null>, ApiResponse<null>>('/v2/auth/signup/complete', payload);
  return response.data;
};

export const refreshSession = async () => {
  const response = await api.post<ApiResponse<null>, ApiResponse<null>>(
    '/v2/auth/refresh',
    null,
    SKIP_AUTH_REFRESH_CONFIG,
  );

  return response.data;
};

export const logout = async () => {
  const response = await api.post<ApiResponse<null>, ApiResponse<null>>(
    '/v2/auth/logout',
    null,
    SKIP_AUTH_REFRESH_CONFIG,
  );

  return response.data;
};

export const getAuthErrorRoute = (errorCode?: null | string) => {
  if (!errorCode) {
    return AUTH_ERROR_ROUTE;
  }

  return `${AUTH_ERROR_ROUTE}?code=${encodeURIComponent(errorCode)}`;
};
