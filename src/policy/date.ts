import { getTodayDateString } from 'utils/date';

import type { AddRecordStatus } from 'types';

export type DateRangePolicy = {
  description: string;
  minDate?: string;
  maxDate?: string;
};

export const isReadingLogEndDateRequired = (status: AddRecordStatus) => status !== 'READING';

export const getReadingLogStartDatePolicy = (): DateRangePolicy => ({
  description: '독서기록 시작일',
  maxDate: getTodayDateString(),
});

export const getReadingLogEndDatePolicy = (startDate: string): DateRangePolicy => ({
  description: '독서기록 종료일',
  minDate: startDate,
  maxDate: getTodayDateString(),
});

export const isDateInRange = (date: string, policy: DateRangePolicy) => {
  if (!date) return false;
  if (policy.minDate && date < policy.minDate) return false;
  if (policy.maxDate && date > policy.maxDate) return false;

  return true;
};

export const isValidReadingLogPeriod = (status: AddRecordStatus, startDate: string, endDate?: string | null) => {
  if (!isDateInRange(startDate, getReadingLogStartDatePolicy())) return false;
  if (!isReadingLogEndDateRequired(status)) return true;
  if (!endDate) return false;

  return isDateInRange(endDate, getReadingLogEndDatePolicy(startDate));
};
