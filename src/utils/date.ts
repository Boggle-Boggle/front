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
const formatBaseDate = (
  dateString?: string | null,
  options: FormatDateOptions = {}
): string => {
  const { separator = '.', includeTime = false, twoDigitYear = false, fallback = '-' } = options;

  const parsed = parseDateString(dateString);
  if (!parsed) return dateString || fallback;

  const { year, month, day, h, m } = parsed;
  const targetYear = twoDigitYear ? year.slice(-2) : year;

  // 1. 기본값으로 대입 (예: . 이나 - 등의 일반 구분자 형태)
  let formattedDate = `${targetYear}${separator}${month}${separator}${day}`;

  // 2. 특수한 경우에 한해 조건부로 재대입(덮어쓰기)
  if (separator === 'korean') {
    formattedDate = `${targetYear}년 ${month}월 ${day}일`;
  }
  if (separator === 'none') {
    formattedDate = `${targetYear}${month}${day}`;
  }

  if (includeTime) {
    return `${formattedDate} ${h}:${m}`;
  }

  return formattedDate;
};

// --- [🌟 일관성 있고 직관적인 공용 포맷팅 함수들] ---

/**
 * YYYY.MM.DD 형태로 온점(Dot) 구분 포맷팅 (예: 2025.03.28)
 */
export const formatToDotDate = (dateTime: string) => {
  return formatBaseDate(dateTime, { separator: '.' });
};

/**
 * YYYY.MM.DD HH:mm 형태로 온점 구분 및 시간 동시 포맷팅 (예: 2025.03.28 14:30)
 */
export const formatToDotDateTime = (dateTime: string) => {
  return formatBaseDate(dateTime, { separator: '.', includeTime: true, fallback: dateTime });
};

/**
 * YY.MM.DD 형태로 2자리 숏 연도 온점 포맷팅 (예: 25.03.28)
 */
export const formatToShortDotDate = (dateString?: string | null) => {
  return formatBaseDate(dateString, { separator: '.', twoDigitYear: true, fallback: '00.00.00' });
};

/**
 * YYYY년 MM월 DD일 한글 전용 포맷팅 (예: 2025년 03월 28일)
 */
export const formatToKoreanDate = (dateString?: string | null) => {
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
