import { useEffect, useMemo, useRef, useState } from 'react';

import { TextButton } from 'components/Button';
import { WheelPicker, type PickerColumn } from 'components/WheelPicker';
import { IconArrowDown } from 'components/icons';

import { CalendarGrid, type CalendarDate } from './CalendarGrid';

type CalendarDatePickerProps =
  | {
      type?: 'single';
      selectedDate: Date;
      onChange: (date: Date) => void;
      mode?: CalendarDatePickerMode;
      onModeChange?: (mode: CalendarDatePickerMode) => void;
      minDate?: Date;
      maxDate?: Date;
    }
  | {
      type: 'range';
      startDate: Date | null;
      endDate: Date | null;
      onChange: (startDate: Date | null, endDate: Date | null) => void;
      mode?: CalendarDatePickerMode;
      onModeChange?: (mode: CalendarDatePickerMode) => void;
      minDate?: Date;
      maxDate?: Date;
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
  minDate?: Date | null,
  maxDate?: Date | null,
): CalendarDate[] => {
  const firstDate = new Date(year, month, 1);
  const startDateOfCalendar = new Date(year, month, 1 - firstDate.getDay());
  const todayDateKey = getDateKey(new Date());

  const selectedKey = selectedDate instanceof Date ? getDateKey(selectedDate) : null;
  const startKey = startDate instanceof Date ? getDateKey(startDate) : null;
  const endKey = endDate instanceof Date ? getDateKey(endDate) : null;
  const minKey = minDate instanceof Date ? getDateKey(minDate) : null;
  const maxKey = maxDate instanceof Date ? getDateKey(maxDate) : null;
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
      isInBetween = startKey !== null && endKey !== null && dateKey > startKey && dateKey < endKey;
    }

    let isDisabled = false;
    if (minKey && dateKey < minKey) isDisabled = true;
    if (maxKey && dateKey > maxKey) isDisabled = true;

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
      isDisabled,
    };
  });
};

export const CalendarDatePicker = (props: CalendarDatePickerProps) => {
  const { type = 'single', mode: externalMode, onModeChange: externalOnModeChange, minDate, maxDate } = props;
  const isRange = type === 'range';

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

  // 외부에서 mode가 주입되면 제어 컴포넌트로 동작하고, 아니면 비제어 내부 상태로 렌더
  const [internalMode, setInternalMode] = useState<CalendarDatePickerMode>('calendar');
  const mode = externalMode !== undefined ? externalMode : internalMode;

  const handleModeChange = (newMode: CalendarDatePickerMode) => {
    if (externalMode === undefined) setInternalMode(newMode);
    if (externalOnModeChange) externalOnModeChange(newMode);
  };

  const prevModeRef = useRef(mode);

  useEffect(() => {
    if (prevModeRef.current !== mode) {
      if (mode === 'calendar') {
        // 휠 피커에서 캘린더 모드로 돌아갈 때 (버튼 클릭 등 외부 요인 포함)
        setVisibleYear(pickerYear);
        setVisibleMonth(pickerMonth);
      } else {
        // 캘린더에서 휠 피커로 진입할 때
        setPickerYear(visibleYear);
        setPickerMonth(visibleMonth);
      }
      prevModeRef.current = mode;
    }
  }, [mode, pickerYear, pickerMonth, visibleYear, visibleMonth]);

  const calendarDates = useMemo(() => {
    if (type === 'range') {
      const rangeProps = props as { startDate: Date | null; endDate: Date | null };
      const { startDate, endDate } = rangeProps;
      return getCalendarDates(visibleYear, visibleMonth, 'range', null, startDate, endDate, minDate, maxDate);
    }
    const singleProps = props as { selectedDate: Date };
    const { selectedDate } = singleProps;
    const safeSelectedDate = selectedDate instanceof Date ? selectedDate : new Date();
    return getCalendarDates(visibleYear, visibleMonth, 'single', safeSelectedDate, null, null, minDate, maxDate);
  }, [props, visibleYear, visibleMonth, type, minDate, maxDate]);

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

          if (type !== 'range') {
            const singleProps = props as { selectedDate: Date; onChange: (date: Date) => void };
            const { selectedDate, onChange } = singleProps;
            const currentDay = selectedDate.getDate();

            const maxDayInNewMonth = new Date(value, pickerMonth + 1, 0).getDate();
            const safeDay = Math.min(currentDay, maxDayInNewMonth);

            onChange(new Date(value, pickerMonth, safeDay));
          }
        },
      },
      {
        key: 'month',
        items: MONTH_ITEMS,
        value: pickerMonth,
        onChange: (value) => {
          if (typeof value !== 'number') return;
          setPickerMonth(value);

          if (type !== 'range') {
            const singleProps = props as { selectedDate: Date; onChange: (date: Date) => void };
            const { selectedDate, onChange } = singleProps;
            const currentDay = selectedDate.getDate();

            const maxDayInNewMonth = new Date(pickerYear, value + 1, 0).getDate();
            const safeDay = Math.min(currentDay, maxDayInNewMonth);

            onChange(new Date(pickerYear, value, safeDay));
          }
        },
      },
    ],
    [pickerMonth, pickerYear, yearItems, type, props],
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
    handleModeChange(mode === 'calendar' ? 'monthYearPicker' : 'calendar');
  };

  return (
    <div className="flex h-[24rem] w-full flex-col">
      <TextButton
        text={`${mode === 'calendar' ? visibleYear : pickerYear}년 ${(mode === 'calendar' ? visibleMonth : pickerMonth) + 1}월`}
        onClick={handleHeaderToggle}
        variant="default"
        rightIcon={IconArrowDown}
        // todo: 폰트 토큰 이상한것 같음 ..
        className="mr-auto justify-start font-pretendard text-[1.375rem] text-h3 font-light outline-none"
      />

      <div className="grid flex-1 items-center overflow-hidden">
        {mode === 'calendar' ? (
          <CalendarGrid calendarDates={calendarDates} onSelectDate={handleSelectDate} />
        ) : (
          <WheelPicker columns={pickerColumns} height={200} itemHeight={40} />
        )}
      </div>
    </div>
  );
};
