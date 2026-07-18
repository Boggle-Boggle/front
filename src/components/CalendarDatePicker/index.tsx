import { useMemo, useState } from 'react';

import { TextButton } from 'components/Button';
import { IconArrowDown } from 'components/icons';

import { WheelPicker, type PickerColumn } from 'components/WheelPicker';

import { CalendarGrid, type CalendarDate } from './CalendarGrid';

type CalendarDatePickerProps =
  | {
      type?: 'single';
      selectedDate: Date;
      onChange: (date: Date) => void;
      onModeChange?: (mode: 'calendar' | 'monthYearPicker') => void;
    }
  | {
      type: 'range';
      startDate: Date | null;
      endDate: Date | null;
      onChange: (startDate: Date | null, endDate: Date | null) => void;
      onModeChange?: (mode: 'calendar' | 'monthYearPicker') => void;
    };

type CalendarDatePickerMode = 'calendar' | 'monthYearPicker';

const START_YEAR = 2000;
const CALENDAR_DATE_COUNT = 42;

const MONTH_ITEMS = Array.from({ length: 12 }).map((_, index) => ({
  value: index,
  label: `${index + 1}월`,
}));

const getDateKey = (date: Date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getCalendarDates = (
  year: number,
  month: number,
  type: 'single' | 'range',
  selectedDate: Date | null,
  startDate: Date | null,
  endDate: Date | null,
): CalendarDate[] => {
  const firstDate = new Date(year, month, 1);
  const startDateOfCalendar = new Date(year, month, 1 - firstDate.getDay());
  const todayDateKey = getDateKey(new Date());

  const selectedKey = selectedDate instanceof Date ? getDateKey(selectedDate) : null;
  const startKey = startDate instanceof Date ? getDateKey(startDate) : null;
  const endKey = endDate instanceof Date ? getDateKey(endDate) : null;
  const hasRangeConnection = startKey !== null && endKey !== null;

  return Array.from({ length: CALENDAR_DATE_COUNT }).map((_, index) => {
    const date = new Date(
      startDateOfCalendar.getFullYear(),
      startDateOfCalendar.getMonth(),
      startDateOfCalendar.getDate() + index,
    );
    const dateKey = getDateKey(date);

    let isStart = false;
    let isEnd = false;
    let isInBetween = false;
    let isSelected = false;

    if (type === 'single') {
      isSelected = selectedKey !== null && dateKey === selectedKey;
    } else {
      isStart = startKey !== null && dateKey === startKey;
      isEnd = endKey !== null && dateKey === endKey;
      isInBetween =
        startKey !== null &&
        endKey !== null &&
        dateKey > startKey &&
        dateKey < endKey;
    }

    return {
      date,
      dateKey,
      isCurrentMonth: date.getMonth() === month,
      isToday: dateKey === todayDateKey,
      isStart,
      isEnd,
      isInBetween,
      isSelected,
      hasRangeConnection,
    };
  });
};

export const CalendarDatePicker = (props: CalendarDatePickerProps) => {
  const { type = 'single' } = props;
  const isRange = type === 'range';

  // 기준 연도 설정 (휠 피커 리스트의 중앙값)
  const [baseYear] = useState<number>(() => {
    if (isRange) {
      const rangeProps = props as { startDate: Date | null };
      const { startDate } = rangeProps;
      return startDate instanceof Date ? startDate.getFullYear() : new Date().getFullYear();
    }
    const singleProps = props as { selectedDate: Date };
    const { selectedDate } = singleProps;
    return selectedDate instanceof Date ? selectedDate.getFullYear() : new Date().getFullYear();
  });

  // 현재 그리드에 보여지는 연/월 네비게이션 상태
  const [visibleYear, setVisibleYear] = useState<number>(() => {
    if (isRange) {
      const rangeProps = props as { startDate: Date | null };
      const { startDate } = rangeProps;
      return startDate instanceof Date ? startDate.getFullYear() : new Date().getFullYear();
    }
    const singleProps = props as { selectedDate: Date };
    const { selectedDate } = singleProps;
    return selectedDate instanceof Date ? selectedDate.getFullYear() : new Date().getFullYear();
  });

  const [visibleMonth, setVisibleMonth] = useState<number>(() => {
    if (isRange) {
      const rangeProps = props as { startDate: Date | null };
      const { startDate } = rangeProps;
      return startDate instanceof Date ? startDate.getMonth() : new Date().getMonth();
    }
    const singleProps = props as { selectedDate: Date };
    const { selectedDate } = singleProps;
    return selectedDate instanceof Date ? selectedDate.getMonth() : new Date().getMonth();
  });

  // 연월 휠 피커의 내부 상태
  const [pickerYear, setPickerYear] = useState<number>(visibleYear);
  const [pickerMonth, setPickerMonth] = useState<number>(visibleMonth);
  const [mode, setMode] = useState<CalendarDatePickerMode>('calendar');

  const handleModeChange = (newMode: CalendarDatePickerMode) => {
    setMode(newMode);
    const { onModeChange } = props;
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  const calendarDates = useMemo(() => {
    if (type === 'range') {
      const rangeProps = props as { startDate: Date | null; endDate: Date | null };
      const { startDate, endDate } = rangeProps;
      return getCalendarDates(visibleYear, visibleMonth, 'range', null, startDate, endDate);
    }
    const singleProps = props as { selectedDate: Date };
    const { selectedDate } = singleProps;
    const safeSelectedDate = selectedDate instanceof Date ? selectedDate : new Date();
    return getCalendarDates(visibleYear, visibleMonth, 'single', safeSelectedDate, null, null);
  }, [props, visibleYear, visibleMonth, type]);

  const yearItems = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearLength = currentYear - START_YEAR + 1;

    return Array.from({ length: yearLength }).map((_, index) => {
      const year = START_YEAR + index;

      return {
        value: year,
        label: `${year}년`,
      };
    });
  }, []);

  const pickerColumns: PickerColumn[] = useMemo(
    () => [
      {
        key: 'year',
        items: yearItems,
        value: pickerYear,
        onChange: (value) => {
          if (typeof value !== 'number') return;
          setPickerYear(value);
        },
      },
      {
        key: 'month',
        items: MONTH_ITEMS,
        value: pickerMonth,
        onChange: (value) => {
          if (typeof value !== 'number') return;
          setPickerMonth(value);
        },
      },
    ],
    [pickerMonth, pickerYear, yearItems],
  );

  const handleSelectDate = (date: Date) => {
    if (type === 'range') {
      const rangeProps = props as {
        startDate: Date | null;
        endDate: Date | null;
        onChange: (startDate: Date | null, endDate: Date | null) => void;
      };
      const { startDate, endDate, onChange } = rangeProps;

      if (!startDate && !endDate) {
        onChange(date, null);
      } else if (startDate && !endDate) {
        const startKey = getDateKey(startDate);
        const clickedKey = getDateKey(date);

        if (clickedKey < startKey) {
          onChange(date, null);
        } else {
          onChange(startDate, date);
        }
      } else {
        onChange(date, null);
      }

      setVisibleYear(date.getFullYear());
      setVisibleMonth(date.getMonth());
    } else {
      const singleProps = props as { onChange: (date: Date) => void };
      const { onChange } = singleProps;
      onChange(date);
      setVisibleYear(date.getFullYear());
      setVisibleMonth(date.getMonth());
    }
  };

  const handleHeaderToggle = () => {
    if (mode === 'calendar') {
      setPickerYear(visibleYear);
      setPickerMonth(visibleMonth);
      handleModeChange('monthYearPicker');
    } else {
      setVisibleYear(pickerYear);
      setVisibleMonth(pickerMonth);
      handleModeChange('calendar');
    }
  };

  return (
    <div className="flex min-h-[21.5rem] flex-col w-full">
      <TextButton
        text={`${mode === 'calendar' ? visibleYear : pickerYear}년 ${(mode === 'calendar' ? visibleMonth : pickerMonth) + 1}월`}
        onClick={handleHeaderToggle}
        variant="default"
        rightIcon={IconArrowDown}
        className="mx-auto mb-5 font-pretendard text-[1.375rem] font-light text-neutral-100 outline-none"
      />

      {mode === 'calendar' ? (
        <CalendarGrid
          calendarDates={calendarDates}
          onSelectDate={handleSelectDate}
        />
      ) : (
        <div className="flex flex-1 flex-col justify-center py-2">
          <WheelPicker columns={pickerColumns} height={200} itemHeight={40} />
        </div>
      )}
    </div>
  );
};
