import { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from '.';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  args: {
    size: 'md',
    fullscreen: false,
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
    fullscreen: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-[320px] w-full items-center justify-center bg-neutral-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Fullscreen: Story = {
  args: {
    fullscreen: true,
  },
};
