type DateFormatSeparator = '.' | '-' | 'korean' | 'none';

interface FormatDateOptions {
  separator?: DateFormatSeparator;
  includeTime?: boolean;
  twoDigitYear?: boolean;
  fallback?: string;
}

/**
 * YYYY-MM-DD 또는 ISO 날짜 문자열을 연, 월, 일, 시, 분, 초 단위로 완전하게 파싱하는 헬퍼 함수 (모듈 내부 전용)
 */
const parseDateString = (dateString?: string | null) => {
  if (!dateString) return null;
  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-');

  if (!year || !month || !day) return null;

  const hourPart = timePart ? timePart.split(':') : [];
  const h = hourPart[0] || '00';
  const m = hourPart[1] || '00';
  const s = hourPart[2] || '00';

  return {
    year,
    month: month.padStart(2, '0'),
    day: day.padStart(2, '0'),
    h: h.padStart(2, '0'),
    m: m.padStart(2, '0'),
    s: s.padStart(2, '0'),
  };
};

/**
 * 구분자 및 스타일에 기반해 유연한 공통 포맷팅을 지원하는 통합 날짜 포맷 함수 (모듈 내부 전용)
 */
const formatBaseDate = (dateString?: string | null, options: FormatDateOptions = {}): string => {
  const { separator = '.', includeTime = false, twoDigitYear = false, fallback = '-' } = options;

  const parsed = parseDateString(dateString);
  if (!parsed) return dateString || fallback;

  const { year, month, day, h, m } = parsed;
  const targetYear = twoDigitYear ? year.slice(-2) : year;

  // 1. 기본값으로 대입 (예: . 이나 - 등의 일반 구분자 형태)
  let formattedDate = `${targetYear}${separator}${month}${separator}${day}`;

  // 2. 특수한 경우에 한해 조건부로 재대입(덮어쓰기)
  if (separator === 'korean') formattedDate = `${targetYear}년 ${month}월 ${day}일`;
  if (separator === 'none') formattedDate = `${targetYear}${month}${day}`;
  if (includeTime) return `${formattedDate} ${h}:${m}`;

  return formattedDate;
};

// --- [개별 기성 의미적 공용 유틸리티 함수 매핑] ---

/**
 * 2025.03.28 형태로 포맷팅
 */
export const formatDateTimeToDate = (dateTime: string) => {
  return formatBaseDate(dateTime, { separator: '.' });
};

/**
 * 2025.03.28 14:30 형태로 포맷팅 (시간 포함)
 */
export const formatDateTime = (dateTime: string) => {
  return formatBaseDate(dateTime, { separator: '.', includeTime: true, fallback: dateTime });
};

/**
 * 25.03.28 형태로 포맷팅 (2자리 연도 표기 리스트용)
 */
export const formatDateLabel = (dateString?: string | null) => {
  return formatBaseDate(dateString, { separator: '.', twoDigitYear: true, fallback: '00.00.00' });
};

/**
 * 2025년 03월 28일 형태로 포맷팅 (한국어 전용)
 */
export const formatKoreanDate = (dateString?: string | null) => {
  return formatBaseDate(dateString, { separator: 'korean' });
};

// --- [기존 달력/검사 관련 보존 함수] ---

export const formatDate = (year: number, month: number, day: number) => {
  const fullYear = year > 2000 ? year : 2000 + year;
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');

  return `${fullYear}-${paddedMonth}-${paddedDay}T00:00:00`;
};

export const generateDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
};

export const isValidDate = (year: number, month: number, day: number) => {
  const newYear = year < 2000 ? 2000 + year : year;
  const date = new Date(newYear, month - 1, day);

  const result = date.getFullYear() === newYear && date.getMonth() === month - 1 && date.getDate() === day;

  return result;
};

export const getTodayDateString = () => {
  const d = new Date();
  const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return formatBaseDate(dateStr, { separator: '-' });
};
