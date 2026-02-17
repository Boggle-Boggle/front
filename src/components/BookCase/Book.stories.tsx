import { Meta, StoryObj } from '@storybook/react-vite';

import { Book } from './Book';

const meta = {
  title: 'Components/BookCase/Book',
  component: Book,
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1, max: 1000, step: 10 } },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Book>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 320,
    title: '공포 영화가 무섭긴 했지만, 연출이 정말 좋았어요.',
  },
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center gap-3 bg-neutral-0 p-6">
      <Book {...args} />
      <Book {...args} page={120} title="시니컬 도쿄" />
      <Book {...args} page={520} title="정키 나이트 타운" />
    </div>
  ),
};
