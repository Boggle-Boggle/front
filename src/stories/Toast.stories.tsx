import type { Meta, StoryObj } from '@storybook/react-vite';

import useToastStore from 'stores/useToastStore';

import { Button } from 'components/refactor/Button';
import Toast from 'components/refactor/Toast';
import ToastContainer from 'components/refactor/Toast/ToastContainer';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['info', 'success', 'error'],
    },
    description: { control: 'text' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const Template: Story['render'] = (args) => {
  const { addToast } = useToastStore();

  return (
    <div className="flex gap-2">
      <Button onClick={() => addToast({ ...args, type: 'info', description: 'info 토스트' })}>Info 토스트 열기</Button>
      <Button onClick={() => addToast({ ...args, type: 'error', description: 'Error 토스트' })}>
        Error 토스트 열기
      </Button>
      <Button onClick={() => addToast({ ...args, type: 'success', description: 'Success 토스트' })}>
        Success 토스트 열기
      </Button>
      <ToastContainer />
    </div>
  );
};

export const SmallToast: Story = {
  render: Template,
  args: {},
};

export const LargeToast: Story = {
  render: Template,
  args: {
    title: '제목 포함',
  },
};
