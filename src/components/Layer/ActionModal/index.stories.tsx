import { Meta, StoryObj } from '@storybook/react-vite';

import { ActionModal } from '.';

const meta = {
  title: 'Components/Layer/ActionModal',
  component: ActionModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ActionModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = () => {};

export const Default: Story = {
  args: {
    title: '타이틀을 입력해주세요',
    description: '내용을 입력해주세요',
    cancelLabel: '아니오',
    confirmLabel: '네',
    onCancel: handleClick,
    onConfirm: handleClick,
    confirmVariant: 'warning',
  },
  render: (args) => {
    return <ActionModal {...args} />;
  },
};
