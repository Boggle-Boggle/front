import Button from 'components/Button';
import HalfScreenModal from 'components/HalfScreenModal';
import Selector from 'pages/BookDetail/ReadingRecordForm/shared/Selector';

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
  MONTH: [
    '01 월',
    '02 월',
    '03 월',
    '04 월',
    '05 월',
    '06 월',
    '07 월',
    '08 월',
    '09 월',
    '10 월',
    '11 월',
    '12 월',
    '전체보기',
  ],
};

type SelectPeriodModalProps = {
  selectedYear: number | null;
  selectedMonth: number | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number | null>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  fetchBooks: () => void;
};

const SelectPeriodModal = ({
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  setTitle,
  close,
  fetchBooks,
}: SelectPeriodModalProps) => {
  const handleSelect = () => {
    fetchBooks();

    const newTitle = `${selectedYear ? selectedYear + 2000 : 2025}년 ${selectedMonth === 13 ? '전체보기' : `${selectedMonth}월`}`;
    setTitle(newTitle);
    close();
  };

  return (
    <HalfScreenModal>
      <div className="absolute bottom-0 left-0 top-0 z-30 flex h-full w-full flex-col rounded-t-2xl bg-white">
        <p className="py-3 text-center">기간 선택</p>
        <hr className="h-[2px] border-none bg-accent" />
        <section className="flex">
          {selectedYear !== null && selectedMonth !== null && (
            <>
              <Selector list={DATE_STATUS.YEARS} selected={selectedYear} setSelected={setSelectedYear} />
              <Selector list={DATE_STATUS.MONTH} selected={selectedMonth} setSelected={setSelectedMonth} />
            </>
          )}
        </section>
        <Button className="mx-auto mb-6 mt-auto w-5/6 font-bold text-white" handleClick={handleSelect}>
          선택
        </Button>
      </div>
    </HalfScreenModal>
  );
};

export default SelectPeriodModal;
