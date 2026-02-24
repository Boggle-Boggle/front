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
      options: ['default', 'bg', 'primaryLine'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    icon: { control: false },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: ComponentProps<typeof TextButton> = {
  onClick: () => {},
  children: '입력',
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

export const BG: Story = {
  args: {
    ...defaultArgs,
    variant: 'bg',
  },
};

export const BGDisabled: Story = {
  args: {
    ...defaultArgs,
    variant: 'bg',
    disabled: true,
  },
};

export const PrimaryLine: Story = {
  args: {
    ...defaultArgs,
    variant: 'primaryLine',
  },
};

export const PrimaryLineDisabled: Story = {
  args: {
    ...defaultArgs,
    variant: 'primaryLine',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...defaultArgs,
    icon: IconCircleCancel,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    ...defaultArgs,
    icon: IconCircleCancel,
    iconPosition: 'right',
  },
};

export const WithLeftIconBG: Story = {
  args: {
    ...defaultArgs,
    variant: 'bg',
    icon: IconCircleCancel,
    iconPosition: 'left',
  },
};

export const WithRightIconBG: Story = {
  args: {
    ...defaultArgs,
    variant: 'bg',
    icon: IconCircleCancel,
    iconPosition: 'right',
  },
};

export const MediumDefault: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
  },
};

export const MediumBG: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'bg',
  },
};

export const MediumPrimaryLine: Story = {
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
    icon: IconCircleCancel,
    iconPosition: 'left',
  },
};

export const MediumWithRightIconBG: Story = {
  args: {
    ...defaultArgs,
    size: 'md',
    variant: 'bg',
    icon: IconCircleCancel,
    iconPosition: 'right',
  },
};

export const SmallDefault: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
  },
};

export const SmallBG: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    variant: 'bg',
  },
};

export const SmallPrimaryLine: Story = {
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
    icon: IconCircleCancel,
    iconPosition: 'left',
  },
};

export const SmallWithRightIconBG: Story = {
  args: {
    ...defaultArgs,
    size: 'sm',
    variant: 'bg',
    icon: IconCircleCancel,
    iconPosition: 'right',
  },
};
