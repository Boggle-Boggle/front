export type ReadingStatus = '읽는중' | '완독' | '중단';

export type MyBook = {
  id: number;
  title: string;
  cover: string;
  readingStatus: ReadingStatus;
  rating: number;
  readCount: number;
  progress: number;
};
