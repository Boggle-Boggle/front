/**
 * 빼곡 프로젝트 전역 공용 도메인 타입 정의 파일
 */

/**
 * 제네릭 T에 null 타입을 결합할 수 있도록 지원하는 전역 유틸리티 타입
 */
export type Nullable<T> = T | null;

/**
 * 영문 독서 상태 코드에 상응하는 사용자 표시용 한글 라벨 변환 맵 (단일 진실 공급원)
 */
export const READING_STATUS_LABEL_BY_CODE = {
  READING: '읽는중',
  COMPLETED: '읽음',
  DROPPED: '중단',
} as const;

/**
 * 독서 상태 영문 코드 유형 (맵의 Key로부터 자동 역산 ➡️ 'READING' | 'COMPLETED' | 'DROPPED')
 */
export type AddRecordStatus = keyof typeof READING_STATUS_LABEL_BY_CODE;

/**
 * 사용자 표시용 독서 상태 한글 라벨 유형 (맵의 Value로부터 자동 역산 ➡️ '읽는중' | '읽음' | '중단')
 */
export type ReadingStatusLabel = (typeof READING_STATUS_LABEL_BY_CODE)[AddRecordStatus];

/**
 * 도서 매체 유형 (지면도서, 전자책)
 */
export type BookMediaType = 'BOOK' | 'EBOOK';

/**
 * 독서 상태 유형
 */
export type ReadingLogStatus = 'ALL' | AddRecordStatus;

/**
 * 독서 진척도 입력 유형 (퍼센티지 비율 %, 페이지 수 PAGE)
 */
export type ReadingLogProgressType = 'PERCENTAGE' | 'PAGE';
