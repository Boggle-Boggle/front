import { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './index';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number' },
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 1,
  },
};

export const Thick: Story = {
  args: {
    size: 2,
    className: 'border-neutral-40',
  },
};
