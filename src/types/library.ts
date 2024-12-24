// 서재 조회
export type Status = 'reading' | 'pending' | 'completed' | 'all';
export type Name = '전체보기' | '읽는 중인 책' | '읽고 있는 책' | '다 읽은 책';

export type StatusLibrary = {
  status: Status;
  libraryName: Name;
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
  status?: Status;
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
