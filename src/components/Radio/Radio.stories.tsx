import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Radio } from 'components/Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'grey'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const radioArgs: ComponentProps<typeof Radio> = {
  id: 'radio',
  name: 'radio-group',
  checked: true,
  onChange: () => {},
  size: 'medium',
  variant: 'primary',
  disabled: false,
};

export const Default: Story = {
  args: {
    ...radioArgs,
  },
};

export const Unchecked: Story = {
  args: {
    ...radioArgs,
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    ...radioArgs,
    disabled: true,
  },
};

export const SmallGrey: Story = {
  args: {
    ...radioArgs,
    size: 'small',
    variant: 'grey',
  },
};
