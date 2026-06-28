import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

export interface TermsItem {
  termsId: number;
  code: string;
  version: number;
  title: string;
  body: string;
  required: boolean;
}

interface TermsLatestResponse {
  items: TermsItem[];
}

export const getLatestTerms = async () => {
  const response = await api.get<ApiSuccessResponse<TermsLatestResponse>>('/v2/terms/latest');

  return response.data.data.items;
};
