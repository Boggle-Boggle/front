import { api } from 'api';

import { ApiResponse } from 'types/api';
import { LatestTermsResponse, Term } from 'types/auth';

export const getLatestTerms = async () => {
  const response = await api.get<ApiResponse<LatestTermsResponse>, ApiResponse<LatestTermsResponse>>(
    '/v2/terms/latest',
  );

  if (!response.data) return [];

  return response.data.items.map(
    (term): Term => ({
      body: term.body,
      code: term.code,
      id: term.termsId,
      required: term.required,
      title: term.title,
      version: term.version,
      effectiveAt: '',
    }),
  );
};
