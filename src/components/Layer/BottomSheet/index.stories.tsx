import { Meta, StoryObj } from '@storybook/react-vite';

import { BottomSheet } from '.';

const meta = {
  title: 'Components/Layer/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the bottom sheet',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-xl font-bold">BottomSheet Content</h2>
        <p>This is a sample bottom sheet content.</p>
        <button type="button" aria-label="Action" className="rounded bg-blue-500 px-4 py-2 text-white">
          Action Button
        </button>
      </div>
    ),
  },
};
