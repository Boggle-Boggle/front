import { getTodayDateString } from 'utils/date';

import type { AddRecordStatus } from 'types';

export type DateRange = {
  minDate?: string;
  maxDate?: string;
};

export type DateRangePolicy = {
  description: string;
} & DateRange;

const READING_LOG_MIN_DATE = '2000-01-01';

export const isReadingLogEndDateRequired = (status: AddRecordStatus) => status !== 'READING';

export const getReadingLogStartDatePolicy = (): DateRangePolicy => ({
  description: '독서기록 시작일',
  minDate: READING_LOG_MIN_DATE,
  maxDate: getTodayDateString(),
});

export const getReadingLogEndDatePolicy = (startDate: string): DateRangePolicy => ({
  description: '독서기록 종료일',
  minDate: startDate,
  maxDate: getTodayDateString(),
});

export const isDateInRange = (date: string, range: DateRange) => {
  if (!date) return false;
  if (range.minDate && date < range.minDate) return false;
  if (range.maxDate && date > range.maxDate) return false;

  return true;
};

export const clampDateToRange = (date: string, range: DateRange) => {
  if (range.minDate && date < range.minDate) return range.minDate;
  if (range.maxDate && date > range.maxDate) return range.maxDate;

  return date;
};

export const isValidReadingLogPeriod = (status: AddRecordStatus, startDate: string, endDate?: string | null) => {
  if (!isDateInRange(startDate, getReadingLogStartDatePolicy())) return false;
  if (!isReadingLogEndDateRequired(status)) return true;
  if (!endDate) return false;

  return isDateInRange(endDate, getReadingLogEndDatePolicy(startDate));
};
