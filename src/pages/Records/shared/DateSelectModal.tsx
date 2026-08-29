import { useState } from 'react';

import { Button } from 'components/Button';
import { CalendarDatePicker } from 'components/CalendarDatePicker';
import { ContentModal } from 'components/Layer/ContentModal';

type DateSelectModalProps = {
  title: string;
  initialDate?: string;
  minDate?: string;
  maxDate?: string;
  onSubmit: (date: string) => void;
  onClose: () => void;
};

const KOREAN_WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DateSelectModal = (props: DateSelectModalProps) => {
  const { title, initialDate, minDate, maxDate, onSubmit, onClose } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    if (initialDate) {
      const parsedDate = new Date(initialDate);
      if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
    }
    return new Date();
  });

  const parsedMinDate = minDate ? new Date(minDate) : undefined;
  const parsedMaxDate = maxDate ? new Date(maxDate) : undefined;

  // 캘린더 데이트피커의 현재 뷰 모드 상태 (기본은 달력 모드)
  const [pickerMode, setPickerMode] = useState<'calendar' | 'monthYearPicker'>('calendar');

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();
  const selectedWeekDay = KOREAN_WEEK_DAYS[selectedDate.getDay()];

  // 모드에 따라 버튼 텍스트를 다르게 렌더링
  const selectButtonText =
    pickerMode === 'monthYearPicker'
      ? `${selectedYear}년 ${selectedMonth}월 선택`
      : `${selectedYear}년 ${selectedMonth}월 ${selectedDay}일(${selectedWeekDay}) 선택`;

  const handleConfirm = () => {
    if (pickerMode === 'monthYearPicker') {
      setPickerMode('calendar');
      return;
    }

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    onSubmit(`${yyyy}-${mm}-${dd}`);
    onClose();
  };

  return (
    <ContentModal title={title} onClose={onClose}>
      <CalendarDatePicker
        selectedDate={selectedDate}
        onChange={handleSelectDate}
        mode={pickerMode}
        onModeChange={setPickerMode}
        minDate={parsedMinDate}
        maxDate={parsedMaxDate}
      />

      <Button onClick={handleConfirm} className="text-[1rem] font-medium">
        {selectButtonText}
      </Button>
    </ContentModal>
  );
};
