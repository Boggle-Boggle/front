import { useQuery } from '@tanstack/react-query';

import { disassemble, getChoseong } from 'es-hangul';
import { useState, useMemo } from 'react';

import { BookCase } from 'components/BookCase';
import { Searchbar } from 'components/Searchbar';

import { getReadingLogs } from './api';

type MainBookCaseItem = {
  id: number;
  page: number;
  title: string;
  disassembledTitle?: string;
  chosungTitle?: string;
};

const MSG_TITLE_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_MAIN_BOOKCASE_TITLE = (year: number) => `${year}년 전체 책장`;
const MSG_MAIN_BOOKCASE_COUNT = (count: number) => `${count}권 채웠습니다`;
const MAIN_READING_LOGS_PAGE = 1;
const MAIN_READING_LOGS_PAGE_SIZE = 100;

const Main = () => {
  const currentYear = new Date().getFullYear();
  const [keyword, setKeyword] = useState<string>('');

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

  // 1. 책 목록을 최초 로드했을 때 딱 한 번만 es-hangul의 disassemble 및 getChoseong을 미리 연산(Pre-compute)하여 캐싱해 둡니다.
  const processedBooks = useMemo<MainBookCaseItem[]>(() => {
    return (
      readingLogs?.data.items.map(({ book, id }) => {
        const { title } = book;
        const lowerTitle = title.toLowerCase();
        return {
          id,
          page: book.totalPages ?? 0,
          title,
          disassembledTitle: disassemble(lowerTitle),
          chosungTitle: getChoseong(lowerTitle),
        };
      }) ?? []
    );
  }, [readingLogs]);

  // 2. 타이핑 시 가공 완료된 캐시 변수들과 검색어만 분해하여 includes 검색만 태웁니다.
  const filteredBooks = useMemo(() => {
    const cleanedKeyword = keyword.trim().toLowerCase();
    if (!cleanedKeyword) return processedBooks;

    const disKeyword = disassemble(cleanedKeyword);
    const choKeyword = getChoseong(cleanedKeyword);

    return processedBooks.filter((book) => {
      // 일반 포함 매칭
      if (book.title.toLowerCase().includes(cleanedKeyword)) return true;
      // 한글 자모분리 중간조합 매칭 (ㄷ -> 데, ㄷㅔ -> 데 등)
      if (book.disassembledTitle?.includes(disKeyword)) return true;
      // 순수 한글 초성 검색 매칭 (ㄷㅁㅇ -> 데미안)
      if (book.chosungTitle?.includes(choKeyword)) return true;

      return false;
    });
  }, [keyword, processedBooks]);

  const totalCount = readingLogs?.meta.page.total ?? processedBooks.length;
  const displayCount = keyword.trim() ? filteredBooks.length : totalCount;

  return (
    <div className="relative h-dvh overflow-hidden bg-secondary">
      <div className="relative z-background flex h-full flex-col px-mobile pb-safe-bottom pt-safe-top">
        <Searchbar
          value={keyword}
          onChange={setKeyword}
          onSubmit={() => {}}
          placeholder={MSG_TITLE_SEARCH_PLACEHOLDER}
        />
        <p className="mt-4 text-title1">{MSG_MAIN_BOOKCASE_TITLE(currentYear)}</p>
        <p className="mb-[1.375rem] text-body1 text-neutral-60">{MSG_MAIN_BOOKCASE_COUNT(displayCount)}</p>
        <div className="h-0 flex-grow overflow-y-auto pb-safe-bottom">
          <BookCase books={filteredBooks} />
        </div>
      </div>

      <div className="absolute inset-0 bg-neutral-0 mix-blend-soft-light" />
      <div className="absolute bottom-0 h-48 w-full bg-[linear-gradient(180deg,_var(--color-primary-light)_0%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};

export default Main;
