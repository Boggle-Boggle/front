import { api } from 'api';

import { PaginatedApiResponse } from 'types/api';
import { GetReadingLogsRequest, ReadingLogListItemResponse } from 'types/readingLog';

export const getReadingLogs = async (request: GetReadingLogsRequest) => {
  const response = await api.get<
    PaginatedApiResponse<ReadingLogListItemResponse[]>,
    PaginatedApiResponse<ReadingLogListItemResponse[]>
  >('/v2/reading-logs', {
    params: request,
  });

  return response;
};
