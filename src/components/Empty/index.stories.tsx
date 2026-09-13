import type { Meta, StoryObj } from '@storybook/react-vite';

import { Empty } from './index';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  args: {
    text: 'Empty Container',
  },
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: '포함된 책장이 없습니다.\n책장을 새로 추가해 보세요!',
  },
};
