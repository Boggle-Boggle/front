import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Button } from 'components/Button';
import { IconArrowLeft } from 'components/icons';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit'],
    },
    width: {
      control: { type: 'select' },
      options: ['long', 'short'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'grey', 'primaryLine', 'warning'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    icon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonArgs: ComponentProps<typeof Button> = {
  onClick: () => {},
  children: 'Button',
  variant: 'primary',
  size: 'small',
  width: 'short',
  disabled: false,
  type: 'submit',
};

export const Default: Story = {
  args: {
    ...buttonArgs,
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...buttonArgs,
    icon: IconArrowLeft,
    iconPosition: 'left',
    children: 'Back',
  },
};
