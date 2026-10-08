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

const formatDateString = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date) => {
  const dateString = formatDateString(date);
  const minDateString = minDate ? formatDateString(minDate) : '';
  const maxDateString = maxDate ? formatDateString(maxDate) : '';

  if (minDateString && dateString < minDateString) return false;
  if (maxDateString && dateString > maxDateString) return false;

  return true;
};

const getInitialSelectedDate = (initialDate?: string, minDate?: Date, maxDate?: Date) => {
  const parsedDate = initialDate ? new Date(initialDate) : new Date();
  const fallbackDate = maxDate ?? minDate ?? new Date();
  const initialSelectedDate = Number.isNaN(parsedDate.getTime()) ? fallbackDate : parsedDate;

  if (minDate && formatDateString(initialSelectedDate) < formatDateString(minDate)) return minDate;
  if (maxDate && formatDateString(initialSelectedDate) > formatDateString(maxDate)) return maxDate;

  return initialSelectedDate;
};

export const DateSelectModal = (props: DateSelectModalProps) => {
  const { title, initialDate, minDate, maxDate, onSubmit, onClose } = props;
  const parsedMinDate = minDate ? new Date(minDate) : undefined;
  const parsedMaxDate = maxDate ? new Date(maxDate) : undefined;
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getInitialSelectedDate(initialDate, parsedMinDate, parsedMaxDate),
  );

  // 캘린더 데이트피커의 현재 뷰 모드 상태 (기본은 달력 모드)
  const [pickerMode, setPickerMode] = useState<'calendar' | 'monthYearPicker'>('calendar');
  const [pickerYear, setPickerYear] = useState<number>(() => selectedDate.getFullYear());
  const [pickerMonth, setPickerMonth] = useState<number>(() => selectedDate.getMonth());

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthYearChange = (year: number, month: number) => {
    setPickerYear(year);
    setPickerMonth(month);
  };

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();
  const selectedWeekDay = KOREAN_WEEK_DAYS[selectedDate.getDay()];
  const pickerMonthText = pickerMonth + 1;

  // 모드에 따라 버튼 텍스트를 다르게 렌더링
  const selectButtonText =
    pickerMode === 'monthYearPicker'
      ? `${pickerYear}년 ${pickerMonthText}월 선택`
      : `${selectedYear}년 ${selectedMonth}월 ${selectedDay}일(${selectedWeekDay}) 선택`;

  const handleConfirm = () => {
    if (pickerMode === 'monthYearPicker') {
      setPickerMode('calendar');
      return;
    }

    if (!isDateInRange(selectedDate, parsedMinDate, parsedMaxDate)) return;

    onSubmit(formatDateString(selectedDate));
    onClose();
  };

  const isSelectedDateValid = isDateInRange(selectedDate, parsedMinDate, parsedMaxDate);

  return (
    <ContentModal title={title} onClose={onClose}>
      <CalendarDatePicker
        selectedDate={selectedDate}
        onChange={handleSelectDate}
        mode={pickerMode}
        onModeChange={setPickerMode}
        onMonthYearChange={handleMonthYearChange}
        minDate={parsedMinDate}
        maxDate={parsedMaxDate}
      />

      <Button onClick={handleConfirm} disabled={!isSelectedDateValid} className="text-[1rem] font-medium">
        {selectButtonText}
      </Button>
    </ContentModal>
  );
};
