import { Meta, StoryObj } from '@storybook/react-vite';

import { BookCase } from 'components/BookCase';

const STORYBOOK_BOOKS = [
  { id: 1, page: 208, title: '소년이 온다' },
  { id: 2, page: 320, title: '작별하지 않는다' },
  { id: 3, page: 512, title: '파친코' },
  { id: 4, page: 184, title: '우리가 빛의 속도로 갈 수 없다면' },
  { id: 5, page: 276, title: '불편한 편의점' },
] as const;

const meta = {
  title: 'Components/BookCase',
  component: BookCase,
  tags: ['autodocs'],
} satisfies Meta<typeof BookCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    books: [...STORYBOOK_BOOKS],
  },
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-0 p-6">
      <BookCase books={[...STORYBOOK_BOOKS]} />
    </div>
  ),
};
