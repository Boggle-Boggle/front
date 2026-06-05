import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './index';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    text: '읽는중',
    variant: 'gray',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['gray', 'white'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gray: Story = {};

export const White: Story = {
  args: {
    text: '읽음',
    variant: 'white',
  },
};
