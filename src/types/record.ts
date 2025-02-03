import { REDING_STATUS } from 'pages/BookDetail/ReadingRecordForm/Status';

// TODO : IMG
import emptyStar1 from 'assets/stars/empty/star1.png';
import emptyStar2 from 'assets/stars/empty/star2.png';
import emptyStar3 from 'assets/stars/empty/star3.png';
import emptyStar4 from 'assets/stars/empty/star4.png';
import emptyStar5 from 'assets/stars/empty/star5.png';
import filledStar1 from 'assets/stars/filled/star1.png';
import filledStar2 from 'assets/stars/filled/star2.png';
import filledStar3 from 'assets/stars/filled/star3.png';
import filledStar4 from 'assets/stars/filled/star4.png';
import filledStar5 from 'assets/stars/filled/star5.png';
import halfStar1 from 'assets/stars/half/star1.png';
import halfStar2 from 'assets/stars/half/star2.png';
import halfStar3 from 'assets/stars/half/star3.png';
import halfStar4 from 'assets/stars/half/star4.png';
import halfStar5 from 'assets/stars/half/star5.png';

import { BookDetail } from './book';

export type StatusType = (typeof REDING_STATUS)[number]['status'];

// Rating
export const RATING_STATUS = [
  {
    status: 1,
    title: '별로예요',
    img: { empty: emptyStar1, half: halfStar1, filled: filledStar1 },
  },
  {
    status: 2,
    title: '그저그래요',
    img: { empty: emptyStar2, half: halfStar2, filled: filledStar2 },
  },
  {
    status: 3,
    title: '보통이에요',
    img: { empty: emptyStar3, half: halfStar3, filled: filledStar3 },
  },
  {
    status: 4,
    title: '좋아요',
    img: { empty: emptyStar4, half: halfStar4, filled: filledStar4 },
  },
  {
    status: 5,
    title: '최고예요',
    img: { empty: emptyStar5, half: halfStar5, filled: filledStar5 },
  },
] as const;

// Date
export type DateType = [number, number, number] | null;

export type RecordType = {
  isbn: string;
  readStatus: StatusType;
  rating: number | null;
  startReadDate: string | null;
  endReadDate: string | null;
  libraryIdList: number[];
  isVisible: boolean;
};

export type RecordLibraries = {
  libraryId: number;
  libraryName: string;
};

export type RecordDate = {
  readDateId: number | null;
  startReadDate: string | null;
  endReadDate: string | null;
};

export type Record = {
  readingRecordId: number;
  bookData: Omit<BookDetail, 'isbn'> & { page: number };
  recordData: {
    rating: number | null;
    readDateList: (RecordDate & { status: StatusType })[];
    libraries: RecordLibraries[];
    isBookVisible: boolean;
  };
};

export type AddNoteParams = {
  readDateId: null | number;
  selectedDate: null | string;
  title: null | string;
  content: null | string;
  page: null | number;
  pages: null | {
    startPage: number;
    endPage: number;
  };
  tags: string[];
};

export type Note = {
  noteId: number;
  title: string | null;
  selectedDate: string | null;
  page: number | null;
  pages: {
    startPage: number;
    endPage: number;
  } | null;
  content: string | null;
  tags: string[] | null;
};

export type Notes = {
  readDate: RecordDate;
  notes: Note[];
};

export type EditRecord = {
  readingRecordId: number;
  rating: number;
  readDateList: (RecordDate & { status: StatusType })[];
  libraries: (RecordLibraries & { selected: boolean })[];
  isBookVisible: false;
};

export type UpdateRecordParams = {
  rating?: number;
  readDateList?: (RecordDate & { status: StatusType })[];
  libraryIdList?: number[];
  isVisible?: boolean;
};
