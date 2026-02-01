import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Button from 'components/Button';

import Selector from './Selector';

export const DATE_STATUS = {
  YEARS: [
    '2001년',
    '2002년',
    '2003년',
    '2004년',
    '2005년',
    '2006년',
    '2007년',
    '2008년',
    '2009년',
    '2010년',
    '2011년',
    '2012년',
    '2013년',
    '2014년',
    '2015년',
    '2016년',
    '2017년',
    '2018년',
    '2019년',
    '2020년',
    '2021년',
    '2022년',
    '2023년',
    '2024년',
    '2025년',
  ],
  MONTH: ['01 월', '02 월', '03 월', '04 월', '05 월', '06 월', '07 월', '08 월', '09 월', '10 월', '11 월', '12 월'],
  DAYS: [
    '01일',
    '02일',
    '03일',
    '04일',
    '05일',
    '06일',
    '07일',
    '08일',
    '09일',
    '10일',
    '11일',
    '12일',
    '13일',
    '14일',
    '15일',
    '16일',
    '17일',
    '18일',
    '19일',
    '20일',
    '21일',
    '22일',
    '23일',
    '24일',
    '25일',
    '26일',
    '27일',
    '28일',
    '29일',
    '30일',
    '31일',
  ],
};

type DateSelectorProps = {
  type: '시작' | '종료';
  initialDate: [number, number, number] | null;
  setDate: Dispatch<SetStateAction<[number, number, number] | null>>;
  setIsChangeDate: Dispatch<SetStateAction<boolean>>;
};

const DateSelector = ({ type, initialDate, setDate, setIsChangeDate }: DateSelectorProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // TODO : 날짜 검증
  const handleSelect = () => {
    if (selectedYear && selectedMonth && selectedDay) setDate([selectedYear, selectedMonth, selectedDay]);
    setIsChangeDate(false);
  };

  useEffect(() => {
    if (initialDate) {
      setSelectedYear(initialDate[0]);
      setSelectedMonth(initialDate[1]);
      setSelectedDay(initialDate[2]);

      return;
    }

    const date = new Date();
    const initialYear = date.getFullYear() % 100;
    const initialMonth = date.getMonth() + 1;
    const initialDay = date.getDate();

    setSelectedYear(initialYear);
    setSelectedMonth(initialMonth);
    setSelectedDay(initialDay);
  }, [initialDate]);

  return (
    <div className="absolute left-0 top-0 z-30 flex h-full w-full flex-col rounded-t-2xl bg-white">
      <p className="py-3 text-center">{type} 날짜 선택</p>
      <hr className="h-[2px] border-none bg-accent" />
      <section className="flex">
        {selectedYear !== null && selectedMonth !== null && selectedDay !== null && (
          <>
            <Selector list={DATE_STATUS.YEARS} selected={selectedYear} setSelected={setSelectedYear} />
            <Selector list={DATE_STATUS.MONTH} selected={selectedMonth} setSelected={setSelectedMonth} />
            <Selector list={DATE_STATUS.DAYS} selected={selectedDay} setSelected={setSelectedDay} />
          </>
        )}
      </section>
      <Button className="mx-auto mb-6 mt-auto w-5/6 font-bold text-white" handleClick={handleSelect}>
        선택
      </Button>
    </div>
  );
};

export default DateSelector;
