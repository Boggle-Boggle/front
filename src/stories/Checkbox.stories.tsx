import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckBox from 'components/refactor/CheckBox';

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'grey'],
    },
    checked: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'small',
    variant: 'grey',
    checked: true,
    onChange: () => {},
  },
};
