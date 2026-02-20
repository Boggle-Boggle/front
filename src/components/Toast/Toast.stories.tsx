import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Toast } from 'components/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'error', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'large'],
    },
    dismissible: { control: 'boolean' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const toastArgs: ComponentProps<typeof Toast> = {
  type: 'info',
  description: '사용자에게 알림을 줍니다. 내용을 삽입하세요.',
  title: 'INFO Notifications',
  size: 'small',
  dismissible: false,
};

export const Small: Story = {
  args: {
    ...toastArgs,
    size: 'small',
  },
};

export const SmallError: Story = {
  args: {
    ...toastArgs,
    type: 'error',
    size: 'small',
  },
};

export const SmallSuccess: Story = {
  args: {
    ...toastArgs,
    type: 'success',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    ...toastArgs,
    size: 'large',
  },
};

export const LargeWithDismiss: Story = {
  args: {
    ...toastArgs,
    size: 'large',
    dismissible: true,
  },
};
