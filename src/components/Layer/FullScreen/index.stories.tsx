import { Meta, StoryObj } from '@storybook/react-vite';

import { FullScreen } from '.';

const meta = {
  title: 'Components/Layer/FullScreen',
  component: FullScreen,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the full screen layer',
    },
  },
} satisfies Meta<typeof FullScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white p-6">
        <h2 className="text-xl font-bold">FullScreen Content</h2>
        <p>This is a sample full screen content.</p>
        <button type="button" aria-label="Close" className="rounded bg-gray-500 px-4 py-2 text-white">
          Close
        </button>
      </div>
    ),
  },
};
