import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import Header from 'components/Header';
import Icon from 'components/Icon';

import useModal from 'hooks/useModal';
import { getBookCase } from 'services/record';

import { MainDate } from 'assets/icons';

import BookCase from './BookCase';
import SelectPeriodModal from './SelectPeriodModal';

// 메인페이지 : 책장/책이 렌더링 되는 페이지
const Home = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // null 을 기준으로 데이터를 페칭해 옴
  // 캐싱을 하지 않음 날짜가 바뀔 때 마다 데이터를 불러오므
  const { data: books, refetch } = useQuery({
    queryKey: ['book', null, null],
    queryFn: () => getBookCase(selectedYear, selectedMonth),
  });

  const { isOpen, close, open } = useModal();

  // 현재 날짜로 초기값 지정
  useEffect(() => {
    const date = new Date();
    const initialYear = date.getFullYear() % 100;
    const initialMonth = date.getMonth() + 1;

    setSelectedYear(initialYear);
    setSelectedMonth(initialMonth);
  }, []);

  return (
    <>
      <Header
        backgroundColor="bg-[#CBBAB9]"
        title={`${selectedYear ? selectedYear + 2000 : 2025}년 ${selectedMonth === 13 ? '전체보기' : `${selectedMonth}월`} (${books?.length ?? 0})`}
        rightBtn={
          <button aria-label="기간선택" type="button" onClick={open}>
            <Icon Component={MainDate} />
          </button>
        }
      />
      {/* 책장 영역 */}
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#CBBAB9]">
        <BookCase books={books ?? []} />
      </div>
      {/* 날짜를 선택하는 모달 */}
      {isOpen && (
        <SelectPeriodModal
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          close={close}
          fetchBooks={refetch}
        />
      )}
    </>
  );
};

export default Home;
