import { useQuery } from '@tanstack/react-query';

import { BookCase } from 'components/BookCase';
import { Searchbar } from 'components/Searchbar';

import { getReadingLogs } from './api';

type MainBookCaseItem = {
  id: number;
  page: number;
  title: string;
};

const MSG_TITLE_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_MAIN_BOOKCASE_TITLE = (year: number) => `${year}년 전체 책장`;
const MSG_MAIN_BOOKCASE_COUNT = (count: number) => `${count}권 채웠습니다`;
const MAIN_READING_LOGS_PAGE = 1;
const MAIN_READING_LOGS_PAGE_SIZE = 100;

const Main = () => {
  const currentYear = new Date().getFullYear();

  const { data: readingLogs } = useQuery({
    queryKey: ['reading-logs', 'list', currentYear],
    queryFn: () =>
      getReadingLogs({
        page: MAIN_READING_LOGS_PAGE,
        size: MAIN_READING_LOGS_PAGE_SIZE,
        sort: 'START_DATE_DESC',
        status: 'ALL',
        year: currentYear,
      }),
  });

  const books: MainBookCaseItem[] =
    readingLogs?.data.items.map(({ book, id }) => ({
      id,
      page: book.totalPages ?? 0,
      title: book.title,
    })) ?? [];
  const totalCount = readingLogs?.meta.page.total ?? books.length;

  return (
    <div className="relative h-dvh overflow-hidden bg-secondary pb-safe-bottom pt-safe-top">
      <div className="relative z-background flex h-full flex-col px-mobile">
        <Searchbar value="" onChange={() => {}} onSubmit={() => {}} placeholder={MSG_TITLE_SEARCH_PLACEHOLDER} />
        <p className="mt-4 text-title1">{MSG_MAIN_BOOKCASE_TITLE(currentYear)}</p>
        <p className="mb-[1.375rem] text-body1 text-neutral-60">{MSG_MAIN_BOOKCASE_COUNT(totalCount)}</p>
        <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
          <BookCase books={books} />
        </div>
      </div>

      <div className="absolute inset-0 bg-neutral-0 mix-blend-soft-light" />
      <div className="absolute bottom-0 h-48 w-full bg-[linear-gradient(180deg,_var(--color-primary-light)_0%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};

export default Main;
