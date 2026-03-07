import { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from '.';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  args: {
    loop: true,
    className: 'h-40 w-40',
    color: '#ffffff',
  },
  argTypes: {
    loop: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'color' },
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
    className: 'h-24 w-24',
  },
};

export const Red: Story = {
  args: {
    color: '#ff0000',
  },
};
