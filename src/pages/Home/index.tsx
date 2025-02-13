import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import Header from 'components/Header';
import Icon from 'components/Icon';

import useModal from 'hooks/useModal';
import { getBookCase } from 'services/record';

import { MainDate } from 'assets/icons';

import BookCase from './BookCase';
import SelectPeriodModal from './SelectPeriodModal';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(25);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(13);

  const { data: books, refetch } = useQuery({
    queryKey: ['book', null, null],
    queryFn: () => getBookCase(selectedYear, selectedMonth),
  });

  const { isOpen, close, open } = useModal();

  return (
    <>
      <Header
        backgroundColor="bg-main"
        title={`${selectedYear ? selectedYear + 2000 : 2025}년 ${selectedMonth === 13 ? '전체보기' : `${selectedMonth}월`} (${books?.length ?? 0})`}
        rightBtn={
          <button aria-label="기간선택" type="button" onClick={open}>
            <Icon Component={MainDate} />
          </button>
        }
      />
      <div className="flex h-full w-full flex-col items-center justify-center bg-main">
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
