// TODO : IMG
import img1 from 'assets/1.png';
import img2 from 'assets/2.png';
import img3 from 'assets/3.png';
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

// Status
export const REDING_STATUS = [
  {
    status: 'reading',
    title: '읽는 중인 책',
    subTitle: '책을 읽고 있는 중이신가요? \n 나중에 다 읽은 책으로 변경할 수 있어요',
    img: img1,
  },
  {
    status: 'completed',
    title: '다 읽은 책',
    subTitle: '대단해요! 책을 다 읽으셨나요? \n 등록 후 책에 대한 이야기를 남겨보세요',
    img: img2,
  },
  {
    status: 'pending',
    title: '읽어보고 싶은 책',
    subTitle: '읽고 싶은 책인가요? \n 잊어버리지 않게 미리 등록해두세요!',
    img: img3,
  },
] as const;

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

export type RatingTitleType = (typeof RATING_STATUS)[number]['title'];

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
  readDateId: number;
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
