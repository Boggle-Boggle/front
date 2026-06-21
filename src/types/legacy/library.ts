// 서재 조회

export const STATUS = {
  reading: '읽는 중인 책',
  pending: '읽고 싶은 책',
  completed: '다 읽은 책',
} as const;

type Status = keyof typeof STATUS;
type Name = (typeof STATUS)[Status];

export type StatusLibrary = {
  status: Status | 'all';
  libraryName: Name | '전체보기';
  bookCount: number;
};

export type CustomLibrary = {
  libraryId: number;
  libraryName: string;
  bookCount: number;
};

export type Libraries = {
  libraryList: CustomLibrary[];
  statusList: StatusLibrary[];
};

// 서재 내 책 조회
export type LibraryBook = {
  readingRecordId: number;
  title: string;
  rating: number | null;
  readingCount: number;
  recentReadDate: {
    startReadDate: string;
    endReadDate: string | null;
  } | null;
  imageUrl: string;
};

export type GetLibraryBooksParams = {
  libraryId?: number;
  status?: Status | 'all';
  pageSize?: number;
  keyword?: string;
};

// 정렬 조회
export const SortingTitle = {
  newest_first: '최신순 보기',
  oldest_first: '오래된순 보기',
  rating: '별점순 보기',
} as const;

export type SortingType = keyof typeof SortingTitle;
