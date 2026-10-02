import { useQuery } from '@tanstack/react-query';

import { shouldThrowToErrorBoundary } from 'policy/error';

import { getReadingLogs, type GetReadingLogsParams } from '../api';
import type { MainPeriodFilterType } from '../types';

const MAIN_READING_LOGS_PAGE = 1;
const MAIN_READING_LOGS_PAGE_SIZE = 100;

type UseMainReadingLogsQueryParams = {
  periodFilter: MainPeriodFilterType;
  selectedBookshelfId: number | null;
  selectedYear: number;
  selectedMonth: number;
};

const getMainReadingLogsParams = (params: UseMainReadingLogsQueryParams): GetReadingLogsParams => {
  const { periodFilter, selectedBookshelfId, selectedYear, selectedMonth } = params;
  const readingLogsParams: GetReadingLogsParams = {
    page: MAIN_READING_LOGS_PAGE,
    size: MAIN_READING_LOGS_PAGE_SIZE,
    sort: 'START_DATE_DESC',
    status: 'ALL',
    hidden: false,
  };

  if (periodFilter === 'GROUP' && selectedBookshelfId) readingLogsParams.bookshelfId = selectedBookshelfId;
  if (periodFilter === 'PERIOD') {
    readingLogsParams.year = selectedYear;
    readingLogsParams.month = selectedMonth;
  }

  return readingLogsParams;
};

export const useMainReadingLogsQuery = (params: UseMainReadingLogsQueryParams) => {
  const { periodFilter, selectedBookshelfId, selectedYear, selectedMonth } = params;

  return useQuery({
    queryKey: ['reading-logs', 'list', periodFilter, selectedBookshelfId, selectedYear, selectedMonth],
    queryFn: () => getReadingLogs(getMainReadingLogsParams(params)),
    throwOnError: shouldThrowToErrorBoundary,
  });
};
