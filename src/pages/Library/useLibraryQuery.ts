import type { PaginationResponse } from 'api.types';

import useInfiniteScroll from 'hooks/useInfiniteScroll';

export type ReadingStatus = '읽는중' | '읽음' | '중단';
export type SortType = 'latest' | 'oldest' | 'popular';
export type ReadingFilterType = 'all' | 'done' | 'reading' | 'stopped';

export type MyBook = {
  id: number;
  title: string;
  cover: string;
  isAdult: boolean;
  readingStatus: ReadingStatus;
  rating: number;
  readCount: number;
  progress: number;
};

const BOOK_TITLES = [
  '리얼 파리',
  '아가씨',
  '영어 고전 명작 필사 -오랫동안 사랑받은 인생 명문장-',
  '도쿄 호텔 도감',
  '리얼 파리',
  '우리는 조금 더 떠나도 됩니다',
  '착! 붙는 일본어',
  '교토 커피',
  '아침에는 죽음을 생각하는 것이 좋다',
  '매혹하는 영어 질문',
  '언제라도 전주',
  '시크릿 가든',
  '나는 나로 살기로 했다',
  '지적 대화를 위한 넓고 얕은 지식',
  '트렌드 코리아 2025',
  '불편한 편의점',
  '역행자',
  '세이노의 가르침',
  '퓨처 셀프',
  '아몬드',
  '달러구트 꿈 백화점',
  '미드나잇 라이브러리',
  '파친코',
  '클루지',
  '하얼빈',
  '모순',
  '흔한남매 과학 탐험대',
  '인생의 컨닝 페이퍼',
  '밤은 노래한다',
  '그가 미쳐가는 소리',
  '당신이 옳다',
  '자존감 수업',
  '죽고 싶지만 떡볶이는 먹고 싶어',
  '게으른 완벽주의자를 위한 심리학',
  '나미야 잡화점의 기적',
  '빛의 제국',
];

const COVER_IMAGE = 'https://image.yes24.com/goods/179603642/L';

const STATUSES: ReadingStatus[] = ['읽는중', '읽음', '중단'];

const READING_STATUS_BY_FILTER: Record<Exclude<ReadingFilterType, 'all'>, ReadingStatus> = {
  done: '읽음',
  reading: '읽는중',
  stopped: '중단',
};

const generateRating = (): number => {
  const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const MOCK_MY_BOOKS: MyBook[] = Array.from({ length: 36 }, (_, i) => {
  const status = STATUSES[i % 3];
  const isAdult = i % 5 === 0 || i % 7 === 0;

  if (status === '읽는중') {
    return {
      id: i + 1,
      title: BOOK_TITLES[i % BOOK_TITLES.length],
      cover: COVER_IMAGE,
      isAdult,
      readingStatus: status,
      rating: 0,
      readCount: 0,
      progress: Math.floor(Math.random() * 80) + 10,
    };
  }

  if (status === '읽음') {
    return {
      id: i + 1,
      title: BOOK_TITLES[i % BOOK_TITLES.length],
      cover: COVER_IMAGE,
      isAdult,
      readingStatus: status,
      rating: generateRating(),
      readCount: Math.floor(Math.random() * 4),
      progress: 100,
    };
  }

  return {
    id: i + 1,
    title: BOOK_TITLES[i % BOOK_TITLES.length],
    cover: COVER_IMAGE,
    isAdult,
    readingStatus: status,
    rating: generateRating(),
    readCount: Math.floor(Math.random() * 3),
    progress: Math.floor(Math.random() * 50),
  };
});

const getLibraryBooksMock = async (
  page: number,
  sortType: SortType,
  readingFilter: ReadingFilterType,
): Promise<PaginationResponse<MyBook[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itemsPerPage = 12;
      const filteredBooks =
        readingFilter === 'all'
          ? MOCK_MY_BOOKS
          : MOCK_MY_BOOKS.filter((book) => book.readingStatus === READING_STATUS_BY_FILTER[readingFilter]);
      const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortType === 'oldest') {
          return a.id - b.id;
        }

        if (sortType === 'popular') {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }

          return b.readCount - a.readCount;
        }

        return b.id - a.id;
      });
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedBooks = sortedBooks.slice(start, end);

      resolve({
        pageNum: page,
        totalResultCnt: sortedBooks.length,
        itemsPerPage,
        items: paginatedBooks,
      });
    }, 500);
  });
};

export const useLibraryQuery = (sortType: SortType, readingFilter: ReadingFilterType) => {
  return useInfiniteScroll<MyBook[]>(
    ['myBooks', 'list', sortType, readingFilter],
    ({ pageParam = 1 }) => getLibraryBooksMock(pageParam, sortType, readingFilter),
    true,
  );
};
