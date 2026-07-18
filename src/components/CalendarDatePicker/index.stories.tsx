import { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { CalendarDatePicker } from './index';

const meta = {
  title: 'Components/CalendarDatePicker',
  component: CalendarDatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 순수한 단일 선택 템플릿 (어떠한 모달 카드 외곽 스타일도 배제)
const SingleDatePickerTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 6, 18));

  return (
    <CalendarDatePicker 
      type="single"
      selectedDate={selectedDate} 
      onChange={setSelectedDate} 
    />
  );
};

// 2. 순수한 기간 선택 템플릿
const RangeDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 6, 15));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 6, 22));

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <CalendarDatePicker
      type="range"
      startDate={startDate}
      endDate={endDate}
      onChange={handleRangeChange}
    />
  );
};

// 기존 URL 및 기본 탐색 유지를 위한 Default 스토리
export const Default: Story = {
  args: {
    type: 'single',
    selectedDate: new Date(2026, 6, 18),
    onChange: () => {},
  },
  render: () => <SingleDatePickerTemplate />,
};

export const Single: Story = {
  args: {
    type: 'single',
    selectedDate: new Date(2026, 6, 18),
    onChange: () => {},
  },
  render: () => <SingleDatePickerTemplate />,
};

export const Range: Story = {
  args: {
    type: 'range',
    startDate: new Date(2026, 6, 15),
    endDate: new Date(2026, 6, 22),
    onChange: () => {},
  },
  render: () => <RangeDatePickerTemplate />,
};
