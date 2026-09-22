export type InputPolicy = {
  description: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowLineBreak?: boolean;
};

export const INPUT_POLICY = {
  NICKNAME: {
    description: '회원가입 및 계정 설정 닉네임',
    minLength: 2,
    maxLength: 15,
    allowLineBreak: false,
  },
  SEARCH_KEYWORD: {
    description: '도서 검색어',
    allowLineBreak: false,
  },
  LIBRARY_SEARCH_KEYWORD: {
    description: '서재 안 도서 검색어',
    allowLineBreak: false,
  },
  CUSTOM_BOOK_TITLE: {
    description: '직접 등록 책 제목',
    minLength: 1,
    maxLength: 500,
    allowLineBreak: false,
  },
  CUSTOM_BOOK_AUTHOR: {
    description: '직접 등록 책 저자 이름',
    minLength: 1,
    maxLength: 500,
    allowLineBreak: false,
  },
  CUSTOM_BOOK_PUBLISHER: {
    description: '직접 등록 책 출판사',
    maxLength: 500,
    allowLineBreak: false,
  },
  CUSTOM_BOOK_ISBN: {
    description: '직접 등록 책 ISBN',
    maxLength: 500,
    allowLineBreak: false,
  },
  CUSTOM_BOOK_TOTAL_PAGES: {
    description: '직접 등록 책 총 페이지 수',
    minLength: 1,
    maxLength: 5,
    pattern: /^\d+$/,
    allowLineBreak: false,
  },
  CUSTOM_BOOK_DESCRIPTION: {
    description: '직접 등록 책 작품 소개/줄거리',
    maxLength: 500,
    allowLineBreak: true,
  },
  CUSTOM_BOOK_COVER_URL: {
    description: '직접 등록 책 표지 이미지 URL',
    allowLineBreak: false,
  },
  REVIEW_CONTENT: {
    description: '책 상세 리뷰 내용',
    minLength: 1,
    maxLength: 700,
    allowLineBreak: true,
  },
  NOTE_TITLE: {
    description: '독서 노트 제목',
    minLength: 1,
    allowLineBreak: false,
  },
  NOTE_BODY: {
    description: '독서 노트 본문',
    minLength: 1,
    maxLength: 10000,
    allowLineBreak: true,
  },
  BOOKSHELF_NAME: {
    description: '독서기록 그룹 이름',
    allowLineBreak: false,
  },
  WITHDRAW_FEEDBACK: {
    description: '회원탈퇴 피드백',
    allowLineBreak: false,
  },
  READING_TOTAL_PAGES: {
    description: '독서기록 총 페이지 수',
    minLength: 1,
    pattern: /^\d+$/,
    allowLineBreak: false,
  },
  READING_PROGRESS_VALUE: {
    description: '독서기록 읽은 페이지 또는 퍼센트',
    minLength: 1,
    pattern: /^\d+$/,
    allowLineBreak: false,
  },
} satisfies Record<string, InputPolicy>;
