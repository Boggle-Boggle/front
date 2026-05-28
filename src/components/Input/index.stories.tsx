import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const noop = () => {};

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'error', 'disabled'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
    value: '',
    onChange: noop,
  },
};

export const Focus: Story = {
  args: {
    value: '포커스된 텍스트',
    onChange: noop,
  },
};

export const Error: Story = {
  args: {
    value: '에러 상태 텍스트',
    onChange: noop,
    variant: 'error',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화 상태',
    value: '',
    onChange: noop,
    variant: 'disabled',
  },
};

export const PrimaryColor: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
    value: '',
    onChange: noop,
    variant: 'primary',
  },
};

export const PrimaryColorFocus: Story = {
  args: {
    value: '프라이머리 컬러 포커스',
    onChange: noop,
    variant: 'primary',
  },
};

export const WithClearButton: Story = {
  args: {
    value: '텍스트를 지울 수 있습니다',
    onChange: noop,
    onClear: () => console.log('Clear clicked'),
  },
};
