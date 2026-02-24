import { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from '.';

const meta = {
  title: 'Components/Layer/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the modal',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-40 w-full flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-xl font-bold">Modal Content</h2>
        <p>This is a sample modal content.</p>
      </div>
    ),
  },
};
