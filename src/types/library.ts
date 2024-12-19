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

export type GetLibraryBooksParams = {
  libraryId?: number;
  status?: 'reading' | 'pending' | 'completed';
  pageSize?: number;
  keyword?: string;
};
