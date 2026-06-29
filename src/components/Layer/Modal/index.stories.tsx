import { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from '.';

const meta = {
  title: 'Components/Layer/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primitive: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <h2 className="text-title2">Primitive Modal</h2>
        <p className="text-body1 text-neutral-60">기존 사용처와 호환되는 기본 쉘입니다.</p>
      </div>
    ),
  },
  render: (args) => {
    return (
      <Modal {...args} />
    );
  },
};
