import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Popover } from 'components/Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const popoverArgs: ComponentProps<typeof Popover> = {
  content: '타이틀 입력',
  placement: 'center',
};

export const Default: Story = {
  args: {
    ...popoverArgs,
  },
  render: (args) => {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center">
        <Popover {...args} />
      </div>
    );
  },
};

export const Left: Story = {
  args: {
    ...popoverArgs,
    placement: 'left',
  },
};

export const Right: Story = {
  args: {
    ...popoverArgs,
    placement: 'right',
  },
};
