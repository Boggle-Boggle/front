import { Meta, StoryObj } from '@storybook/react-vite';

import IconButton from './IconButton';
import { IconArrowLeft, IconCircleCancelFilled } from '../icons';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    icon: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '뒤로가기',
    icon: IconArrowLeft,
    size: 'md',
    align: 'center',
    onClick: () => {},
  },
};

export const Small: Story = {
  args: {
    label: '입력된 검색어 삭제',
    icon: IconCircleCancelFilled,
    size: 'sm',
    align: 'center',
    onClick: () => {},
  },
};
