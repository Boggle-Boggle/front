export type InputPolicy = {
  description: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  allowLineBreak?: boolean;
};

export const DIGIT_PATTERN = /^\d+$/;
export const OPTIONAL_DIGIT_PATTERN = /^\d*$/;

export const SEARCH_KEYWORD = {
  description: '도서 검색어',
  allowLineBreak: false,
} satisfies InputPolicy;

export const LIBRARY_SEARCH_KEYWORD = {
  description: '서재 안 도서 검색어',
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_TITLE = {
  description: '직접 등록 책 제목',
  minLength: 1,
  maxLength: 500,
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_AUTHOR = {
  description: '직접 등록 책 저자 이름',
  minLength: 1,
  maxLength: 500,
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_PUBLISHER = {
  description: '직접 등록 책 출판사',
  maxLength: 500,
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_ISBN = {
  description: '직접 등록 책 ISBN',
  maxLength: 500,
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_TOTAL_PAGES = {
  description: '직접 등록 책 총 페이지 수',
  minLength: 1,
  maxLength: 5,
  minValue: 1,
  maxValue: 10000,
  pattern: DIGIT_PATTERN,
  allowLineBreak: false,
} satisfies InputPolicy;

export const CUSTOM_BOOK_DESCRIPTION = {
  description: '직접 등록 책 작품 소개/줄거리',
  maxLength: 500,
  allowLineBreak: true,
} satisfies InputPolicy;

export const CUSTOM_BOOK_COVER_URL = {
  description: '직접 등록 책 표지 이미지 URL',
  allowLineBreak: false,
} satisfies InputPolicy;

export const REVIEW_CONTENT = {
  description: '책 상세 리뷰 내용',
  minLength: 1,
  maxLength: 700,
  allowLineBreak: true,
} satisfies InputPolicy;

export const NOTE_TITLE = {
  description: '독서 노트 제목',
  minLength: 1,
  maxLength: 100,
  allowLineBreak: false,
} satisfies InputPolicy;

export const NOTE_BODY = {
  description: '독서 노트 본문',
  minLength: 1,
  maxLength: 10000,
  allowLineBreak: true,
} satisfies InputPolicy;

export const BOOKSHELF_NAME = {
  description: '독서기록 그룹 이름',
  allowLineBreak: false,
} satisfies InputPolicy;

export const WITHDRAW_FEEDBACK = {
  description: '회원탈퇴 피드백',
  allowLineBreak: false,
} satisfies InputPolicy;

export const READING_TOTAL_PAGES = {
  description: '독서기록 총 페이지 수',
  minLength: 1,
  maxLength: 5,
  minValue: 1,
  maxValue: 10000,
  pattern: DIGIT_PATTERN,
  allowLineBreak: false,
} satisfies InputPolicy;

export const READING_PROGRESS_VALUE = {
  description: '독서기록 읽은 페이지 또는 퍼센트',
  minLength: 1,
  pattern: DIGIT_PATTERN,
  allowLineBreak: false,
} satisfies InputPolicy;

export const INPUT_POLICY = {
  SEARCH_KEYWORD,
  LIBRARY_SEARCH_KEYWORD,
  CUSTOM_BOOK_TITLE,
  CUSTOM_BOOK_AUTHOR,
  CUSTOM_BOOK_PUBLISHER,
  CUSTOM_BOOK_ISBN,
  CUSTOM_BOOK_TOTAL_PAGES,
  CUSTOM_BOOK_DESCRIPTION,
  CUSTOM_BOOK_COVER_URL,
  REVIEW_CONTENT,
  NOTE_TITLE,
  NOTE_BODY,
  BOOKSHELF_NAME,
  WITHDRAW_FEEDBACK,
  READING_TOTAL_PAGES,
  READING_PROGRESS_VALUE,
} satisfies Record<string, InputPolicy>;
