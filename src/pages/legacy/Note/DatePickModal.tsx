import { useEffect, useState } from 'react';

import Button from 'components/Button';
import Modal from 'components/Modal';
import { DATE_STATUS } from 'pages/legacy/BookDetail/ReadingRecordForm/shared/DateSelector';
import Selector from 'pages/legacy/BookDetail/ReadingRecordForm/shared/Selector';

type DatePickModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
  initialDate: [number, number, number];
  setSelectedDate: React.Dispatch<React.SetStateAction<[number, number, number]>>;
};

const DatePickModal = ({ isOpen, close, scrollPos, setSelectedDate, initialDate }: DatePickModalProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleSelect = () => {
    if (selectedYear && selectedMonth && selectedDay) setSelectedDate([selectedYear, selectedMonth, selectedDay]);
    close();
  };

  useEffect(() => {
    // 초기 값
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
    <Modal isOpen={isOpen} scrollPos={scrollPos} onClose={close}>
      <section className="relative h-auto w-80 text-center">
        <div className="z-30 flex h-full w-full flex-col rounded-t-2xl bg-white">
          <p className="py-3 text-center"> 날짜 선택</p>
          <hr className="bg-accent h-[2px] border-none" />
          <section className="flex">
            {selectedYear !== null && selectedMonth !== null && selectedDay !== null && (
              <>
                <Selector list={DATE_STATUS.YEARS} selected={selectedYear} setSelected={setSelectedYear} />
                <Selector list={DATE_STATUS.MONTH} selected={selectedMonth} setSelected={setSelectedMonth} />
                <Selector list={DATE_STATUS.DAYS} selected={selectedDay} setSelected={setSelectedDay} />
              </>
            )}
          </section>
        </div>

        <p className="m-3">
          <Button handleClick={handleSelect}>선택 완료</Button>
        </p>
      </section>
    </Modal>
  );
};

export default DatePickModal;
