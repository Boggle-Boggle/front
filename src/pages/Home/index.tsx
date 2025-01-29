import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { IoCalendarNumberOutline } from 'react-icons/io5';

import Header from 'components/Header';

import useModal from 'hooks/useModal';
import { getBookCase } from 'services/record';

import BookCase from './BookCase';
import SelectPeriodModal from './SelectPeriodModal';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data: books, refetch } = useQuery({
    queryKey: ['book', null, null],
    queryFn: () => getBookCase(selectedYear, selectedMonth),
  });

  const { isOpen, close, open } = useModal();

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
            <IoCalendarNumberOutline style={{ width: '24px', height: '24px' }} />
          </button>
        }
      />
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#CBBAB9]">
        <BookCase books={books ?? []} />
      </div>
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
