import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

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
      options: ['default', 'primary'],
    },
    isError: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
  },
};

export const Focus: Story = {
  args: {
    value: '포커스된 텍스트',
  },
};

export const Error: Story = {
  args: {
    value: '에러 상태 텍스트',
    isError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화 상태',
    disabled: true,
  },
};

export const PrimaryColor: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
    variant: 'primary',
  },
};

export const PrimaryColorFocus: Story = {
  args: {
    value: '프라이머리 컬러 포커스',
    variant: 'primary',
  },
};

export const WithClearButton: Story = {
  args: {
    value: '텍스트를 지울 수 있습니다',
    onClear: () => console.log('Clear clicked'),
  },
};
