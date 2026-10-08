import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { CalendarDatePicker } from './index';

const meta = {
  title: 'Components/CalendarDatePicker',
  component: CalendarDatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleDatePickerTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 6, 18));

  return <CalendarDatePicker type="single" selectedDate={selectedDate} onChange={setSelectedDate} />;
};

const RangeDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 6, 15));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 6, 22));

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <CalendarDatePicker type="range" startDate={startDate} endDate={endDate} onChange={handleRangeChange} />
  );
};

const RestrictedSingleDatePickerTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 6, 18));

  return (
    <CalendarDatePicker
      type="single"
      selectedDate={selectedDate}
      minDate={new Date(2026, 6, 10)}
      maxDate={new Date(2026, 6, 25)}
      onChange={setSelectedDate}
    />
  );
};

const RestrictedRangeDatePickerTemplate = () => {
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
      minDate={new Date(2026, 6, 10)}
      maxDate={new Date(2026, 6, 25)}
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

export const RestrictedSingle: Story = {
  args: {
    type: 'single',
    selectedDate: new Date(2026, 6, 18),
    minDate: new Date(2026, 6, 10),
    maxDate: new Date(2026, 6, 25),
    onChange: () => {},
  },
  render: () => <RestrictedSingleDatePickerTemplate />,
};

export const RestrictedRange: Story = {
  args: {
    type: 'range',
    startDate: new Date(2026, 6, 15),
    endDate: new Date(2026, 6, 22),
    minDate: new Date(2026, 6, 10),
    maxDate: new Date(2026, 6, 25),
    onChange: () => {},
  },
  render: () => <RestrictedRangeDatePickerTemplate />,
};
