import { Meta, StoryObj } from '@storybook/react-vite';

import { useState, useMemo, useEffect } from 'react';

import { WheelPicker, PickerColumn } from './index';

const meta: Meta<typeof WheelPicker> = {
  title: 'Components/WheelPicker',
  component: WheelPicker,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number' },
    itemHeight: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof WheelPicker>;

export const Default: Story = {
  args: {
    columns: [
      {
        key: 'fruit',
        value: 'apple',
        onChange: () => {},
        items: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'orange', label: 'Orange' },
          { value: 'grape', label: 'Grape' },
          { value: 'melon', label: 'Melon' },
        ],
      },
    ],
  },
};

const DatePickerTemplate = () => {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(10);
  const [day, setDay] = useState(25);

  const years = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const val = 2000 + i;
      return { value: val, label: `${val}년` };
    });
  }, []);

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const val = i + 1;
      return { value: val, label: `${val}월` };
    });
  }, []);

  const days = useMemo(() => {
    const lastDay = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => {
      const val = i + 1;
      return { value: val, label: `${val}일` };
    });
  }, [year, month]);

  // Auto-correct day if it exceeds the new month's max day
  useEffect(() => {
    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) {
      setDay(maxDay);
    }
  }, [year, month, day]);

  const columns: PickerColumn[] = [
    {
      key: 'year',
      value: year,
      onChange: (val) => setYear(Number(val)),
      items: years,
    },
    {
      key: 'month',
      value: month,
      onChange: (val) => setMonth(Number(val)),
      items: months,
    },
    {
      key: 'day',
      value: day,
      onChange: (val) => setDay(Number(val)),
      items: days,
    },
  ];

  return (
    <div className="mx-auto max-w-sm rounded-lg border p-4 shadow-sm">
      <h3 className="mb-4 text-center font-bold">
        {year}년 {month}월 {day}일
      </h3>
      <WheelPicker columns={columns} />
    </div>
  );
};

export const DatePickerExample: Story = {
  render: () => <DatePickerTemplate />,
};
