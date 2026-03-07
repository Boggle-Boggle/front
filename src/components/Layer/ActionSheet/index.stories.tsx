import { Meta, StoryObj } from '@storybook/react-vite';

import { ActionSheet } from '.';

const meta = {
  title: 'Components/Layer/ActionSheet',
  component: ActionSheet,
  tags: ['autodocs'],
} satisfies Meta<typeof ActionSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const sortItems = [
  {
    key: 'latest',
    label: '최신순',
    selected: true,
  },
  {
    key: 'oldest',
    label: '과거순',
  },
  {
    key: 'popular',
    label: '인기순',
  },
];

const destructiveItems = [
  {
    key: 'edit',
    label: '수정하기',
  },
  {
    key: 'delete',
    label: '삭제하기',
    tone: 'destructive' as const,
  },
  {
    key: 'disabled',
    label: '비활성화 옵션',
    disabled: true,
  },
];

export const SortOptions: Story = {
  args: {
    items: sortItems,
  },
};

export const WithDestructiveAction: Story = {
  args: {
    items: destructiveItems,
    cancelLabel: '닫기',
  },
};
