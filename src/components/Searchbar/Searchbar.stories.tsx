import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ComponentProps } from 'react';

import { Searchbar } from 'components/Searchbar';

const meta = {
  title: 'Components/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onSubmit: { action: 'submitted' },
    isSearched: { control: 'boolean' },
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs: ComponentProps<typeof Searchbar> = {
  value: '',
  onChange: () => {},
  onSubmit: () => {},
  placeholder: '책 제목을 입력해주세요',
  isSearched: false,
};

export const Empty: Story = {
  args: {
    ...baseArgs,
  },
};

export const Typing: Story = {
  args: {
    ...baseArgs,
    value: '도슨트와 함ㄲ',
  },
};

export const Searched: Story = {
  args: {
    ...baseArgs,
    value: '도슨트와 함ㄲ',
    isSearched: true,
  },
};
