import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { TextButton } from 'components/Button';
import { IconCircleCancel } from 'components/icons';

const meta = {
  title: 'Components/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primaryLine', 'filled'],
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: ComponentProps<typeof TextButton> = {
  onClick: () => {},
  text: '입력',
  size: 'lg',
  variant: 'default',
  disabled: false,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const DefaultDisabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const FilledDisabled: Story = {
  args: {
    ...defaultArgs,
    variant: 'filled',
    disabled: true,
  },
};

export const Line: Story = {
  args: {
    ...defaultArgs,
    variant: 'primaryLine',
  },
};

export const LineDisabled: Story = {
  args: {
    ...defaultArgs,
    variant: 'primaryLine',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...defaultArgs,
    leftIcon: IconCircleCancel,
  },
};

export const WithRightIcon: Story = {
  args: {
    ...defaultArgs,
    rightIcon: IconCircleCancel,
  },
};

export const WithLeftIconFilled: Story = {
  args: {
    ...defaultArgs,
    variant: 'filled',
    leftIcon: IconCircleCancel,
  },
};

export const WithRightIconFilled: Story = {
  args: {
    ...defaultArgs,
    variant: 'filled',
    rightIcon: IconCircleCancel,
  },
};

export const MediumDefault: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
  },
};

export const MediumFilled: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'filled',
  },
};

export const MediumLine: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'primaryLine',
  },
};

export const MediumWithLeftIcon: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    leftIcon: IconCircleCancel,
  },
};

export const MediumWithRightIconFilled: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'filled',
    rightIcon: IconCircleCancel,
  },
};

export const MediumWithRightIconLine: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'primaryLine',
    rightIcon: IconCircleCancel,
  },
};

export const SmallDefault: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
  },
};

export const SmallFilled: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    variant: 'filled',
  },
};

export const SmallLine: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    variant: 'primaryLine',
  },
};

export const SmallWithLeftIcon: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    leftIcon: IconCircleCancel,
  },
};

export const SmallWithRightIconFilled: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    variant: 'filled',
    rightIcon: IconCircleCancel,
  },
};
