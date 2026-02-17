import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Checkbox } from 'components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      control: { type: 'select' },
      options: ['mini', 'regular'],
    },
    variant: {
      control: { type: 'select' },
      options: ['color', 'black'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const checkboxArgs: ComponentProps<typeof Checkbox> = {
  id: 'check-box',
  checked: false,
  onChange: () => {},
  size: 'regular',
  variant: 'color',
  disabled: false,
};

export const Default: Story = {
  args: {
    ...checkboxArgs,
  },
};

export const Checked: Story = {
  args: {
    ...checkboxArgs,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...checkboxArgs,
    disabled: true,
  },
};

export const MiniBlack: Story = {
  args: {
    ...checkboxArgs,
    size: 'mini',
    variant: 'black',
  },
};
