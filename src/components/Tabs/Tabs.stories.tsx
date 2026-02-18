import { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Tabs } from 'components/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['equal', 'scroll'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'step'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoReview: Story = {
  args: {
    tabs: [
      { id: 'info', label: '정보' },
      { id: 'review', label: '리뷰' },
    ],
    value: 'info',
    onChange: () => {},
    layout: 'equal',
    size: 'md',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    const handleChange = (id: string) => {
      setValue(id);
      args.onChange(id);
    };

    return <Tabs {...args} value={value} onChange={handleChange} />;
  },
};

export const ThreeTabs: Story = {
  args: {
    tabs: [
      { id: '1', label: '1' },
      { id: '2', label: '2' },
      { id: '3', label: '3' },
    ],
    value: '1',
    onChange: () => {},
    layout: 'equal',
    size: 'sm',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    const handleChange = (id: string) => {
      setValue(id);
      args.onChange(id);
    };

    return <Tabs {...args} value={value} onChange={handleChange} />;
  },
};

export const Scrollable: Story = {
  args: {
    tabs: Array.from({ length: 10 }).map((_, index) => ({
      id: String(index + 1),
      label: String(index + 1),
    })),
    value: '1',
    onChange: () => {},
    layout: 'scroll',
    size: 'md',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    const handleChange = (id: string) => {
      setValue(id);
      args.onChange(id);
    };

    return <Tabs {...args} value={value} onChange={handleChange} />;
  },
};

export const StepTabs: Story = {
  args: {
    tabs: [
      { id: '1', step: '1', label: '기본정보' },
      { id: '2', step: '2', label: '독서기록' },
      { id: '3', step: '3', label: '완료' },
    ],
    value: '1',
    onChange: () => {},
    layout: 'equal',
    size: 'md',
    variant: 'step',
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    const handleChange = (id: string) => {
      setValue(id);
      args.onChange(id);
    };

    return <Tabs {...args} value={value} onChange={handleChange} />;
  },
};
