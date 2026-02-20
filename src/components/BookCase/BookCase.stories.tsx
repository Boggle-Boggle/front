import { Meta, StoryObj } from '@storybook/react-vite';

import { BookCase } from 'components/BookCase';

const meta = {
  title: 'Components/BookCase',
  component: BookCase,
  tags: ['autodocs'],
} satisfies Meta<typeof BookCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-0 p-6">
      <BookCase />
    </div>
  ),
};
