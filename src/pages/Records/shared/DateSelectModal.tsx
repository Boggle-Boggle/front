import { useState } from 'react';

import { Button } from 'components/Button';
import { CalendarDatePicker } from 'components/CalendarDatePicker';
import { ContentModal } from 'components/Layer/ContentModal';

type DateSelectModalProps = {
  title: string;
  onClose: () => void;
};

const KOREAN_WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DateSelectModal = (props: DateSelectModalProps) => {
  const { title, onClose } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();
  const selectedWeekDay = KOREAN_WEEK_DAYS[selectedDate.getDay()];
  const selectButtonText = `${selectedYear}년 ${selectedMonth}월 ${selectedDay}일(${selectedWeekDay}) 선택`;

  return (
    <ContentModal title={title} onClose={onClose}>
      <CalendarDatePicker selectedDate={selectedDate} onChange={handleSelectDate} />

      <Button onClick={onClose} className="text-[1rem] font-medium">
        {selectButtonText}
      </Button>
    </ContentModal>
  );
};
