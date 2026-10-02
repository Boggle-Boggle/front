import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';

import { BookCase } from 'components/BookCase';
import { Searchbar } from 'components/Searchbar';
import { IconArrowDown } from 'components/icons';

import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { MainPeriodModal } from './components/MainPeriodModal';
import { MainSkeleton } from './components/MainSkeleton';
import { useMainBookshelvesQuery } from './queries/useMainBookshelvesQuery';
import { useMainReadingLogsQuery } from './queries/useMainReadingLogsQuery';
import type { MainPeriodFilterType } from './types';

type MainBookCaseItem = {
  id: number;
  page: number;
  title: string;
};

const MSG_TITLE_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_MAIN_BOOKCASE_COUNT = (count: number) => `${count}권 채웠습니다`;

const Main = () => {
  const navigate = useNavigate();
  const { push } = useLayerStore();

  const [periodFilter, setPeriodFilter] = useState<MainPeriodFilterType>('ALL');
  const [selectedBookshelfId, setSelectedBookshelfId] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const { data: readingLogs, isLoading: isReadingLogsLoading } = useMainReadingLogsQuery({
    periodFilter,
    selectedBookshelfId,
    selectedYear,
    selectedMonth,
  });
  const { data: bookshelves } = useMainBookshelvesQuery();

  const scrollRef = useScrollRestoration<HTMLDivElement>({
    isReady: readingLogs !== undefined,
  });

  const handleOpenFilter = () => {
    push({
      id: 'main-period-modal',
      component: (
        <MainPeriodModal
          currentFilter={periodFilter}
          currentBookshelfId={selectedBookshelfId}
          currentYear={selectedYear}
          currentMonth={selectedMonth}
          onConfirm={({ filter, bookshelfId, year, month }) => {
            setPeriodFilter(filter);
            setSelectedBookshelfId(bookshelfId);
            setSelectedYear(year);
            setSelectedMonth(month);
          }}
          bookshelves={bookshelves}
        />
      ),
    });
  };

  const getBookcaseTitle = () => {
    if (periodFilter === 'GROUP') {
      const activeBookshelf = bookshelves?.find((b) => b.id === selectedBookshelfId);
      return activeBookshelf ? `${activeBookshelf.name} 책장` : '그룹별 책장';
    }
    if (periodFilter === 'PERIOD') {
      return `${selectedYear}년 ${selectedMonth}월 책장`;
    }
    return '전체 책장';
  };

  // 1. 책 목록을 최초 로드했을 때 메인 책장용 데이터 구조로 포맷팅합니다.
  const processedBooks = useMemo<MainBookCaseItem[]>(() => {
    return (
      readingLogs?.data.items.map(({ book, id, totalPagesOverride }) => ({
        id,
        page: totalPagesOverride ?? book.totalPages ?? 0,
        title: book.title,
      })) ?? []
    );
  }, [readingLogs]);

  const displayCount = processedBooks.length;

  if (isReadingLogsLoading) return <MainSkeleton />;

  return (
    <div className="relative h-full overflow-hidden bg-secondary">
      <div className="relative z-background flex h-full flex-col px-mobile pt-safe-top">
        <Searchbar
          value=""
          onChange={() => {}}
          onFocus={() => navigate('/search', { state: { autoFocus: true } })}
          placeholder={MSG_TITLE_SEARCH_PLACEHOLDER}
        />
        <button type="button" onClick={handleOpenFilter} className="mt-4 flex items-center gap-1 text-left text-title1">
          {getBookcaseTitle()}

          <IconArrowDown className="ml-1 size-icon-sm text-neutral-60" />
        </button>
        <p className="mb-[1.375rem] text-body1 text-neutral-60">{MSG_MAIN_BOOKCASE_COUNT(displayCount)}</p>
        <div ref={scrollRef} className="h-0 flex-grow overflow-y-auto pb-safe-bottom">
          <BookCase books={processedBooks} onBookClick={(id) => navigate(`/records/${id}`)} />
        </div>
      </div>

      <div className="absolute inset-0 bg-neutral-0 mix-blend-soft-light" />
      <div className="absolute bottom-0 h-36 w-full bg-[linear-gradient(180deg,_var(--color-primary-light)_0%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};

export default Main;
