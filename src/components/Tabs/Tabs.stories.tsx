import { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Tabs } from 'components/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'info', label: '정보' },
      { id: 'review', label: '리뷰' },
    ],
    value: 'info',
    onChange: () => {},
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
      { id: 'book', label: '책 정보' },
      { id: 'record', label: '기록' },
      { id: 'review', label: '리뷰' },
    ],
    value: 'book',
    onChange: () => {},
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
