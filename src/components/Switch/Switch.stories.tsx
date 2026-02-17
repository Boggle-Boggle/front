import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps } from 'react';

import { Switch } from 'components/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const switchArgs: ComponentProps<typeof Switch> = {
  checked: false,
  onChange: () => {},
  disabled: false,
};

export const Default: Story = {
  args: {
    ...switchArgs,
  },
};

export const Checked: Story = {
  args: {
    ...switchArgs,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...switchArgs,
    disabled: true,
  },
};
