export type ReadingLogStatus = 'ALL' | 'READING' | 'COMPLETED' | 'DROPPED';

export type ReadingLogSort = 'RECENT' | 'OLDEST';

export type GetReadingLogsRequest = {
  page: number;
  size: number;
  sort: ReadingLogSort;
  status: ReadingLogStatus;
  bookshelfId?: number;
  year?: number;
  month?: number;
  isHidden?: boolean;
};

export type ReadingLogBookSummaryResponse = {
  title: string;
  author: string;
  coverUrl?: string;
  totalPages?: number;
};

export type ReadingLogListItemResponse = {
  id: number;
  book: ReadingLogBookSummaryResponse;
  status: Exclude<ReadingLogStatus, 'ALL'>;
  rating?: number;
  progressType?: string;
  progressValue?: number;
  progressPercentage?: number;
  startDate?: string;
  endDate?: string;
};

export type MainBookCaseItem = {
  id: number;
  page: number;
  title: string;
};
