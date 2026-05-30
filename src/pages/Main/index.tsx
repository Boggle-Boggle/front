import { useQuery } from '@tanstack/react-query';

import { BookCase } from 'components/BookCase';
import { Searchbar } from 'components/Searchbar';
import Loading from 'pages/Loading';

import { getReadingLogs } from 'services/readingLogs';

import { MainBookCaseItem, ReadingLogListItemResponse } from 'types/readingLog';

const MSG_TITLE_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_MAIN_BOOKCASE_TITLE = (year: number) => `${year}년 전체 책장`;
const MSG_MAIN_BOOKCASE_COUNT = (count: number) => `${count}권 채웠습니다`;
const MAIN_BOOKCASE_PAGE_SIZE = 100;

const toMainBookCaseItem = (readingLog: ReadingLogListItemResponse): MainBookCaseItem => {
  return {
    id: readingLog.id,
    page: readingLog.book.totalPages ?? 100,
    title: readingLog.book.title,
  };
};

const Main = () => {
  const currentYear = new Date().getFullYear();
  const { data, isLoading } = useQuery({
    queryKey: ['readingLogs', 'mainBookcase', currentYear],
    queryFn: () =>
      getReadingLogs({
        page: 1,
        size: MAIN_BOOKCASE_PAGE_SIZE,
        sort: 'RECENT',
        status: 'ALL',
        year: currentYear,
      }),
  });

  const books: MainBookCaseItem[] = data?.data?.map(toMainBookCaseItem) ?? [];
  const totalCount = data?.meta.page?.total ?? books.length;

  if (isLoading) return <Loading />;

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
