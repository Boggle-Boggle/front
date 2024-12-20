export type Library = {
  libraryId: number;
  libraryName: string;
  bookCount: number;
};

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

export const DefaultLibraryTitle = {
  all: '전체보기',
  reading: '읽는중인 책',
  pending: '읽고 있는 책',
  completed: '다 읽은 책',
};

export type DefaultLibraryStatus = 'reading' | 'pending' | 'completed';

export type GetLibraryBooksParams = {
  libraryId?: number;
  status?: DefaultLibraryStatus;
  pageSize?: number;
  keyword?: string;
};

export const SortingTitle = {
  newest_first: '최신순 보기',
  oldest_first: '오래된순 보기',
  rating: '별점순 보기',
} as const;

export type SortingType = keyof typeof SortingTitle;
