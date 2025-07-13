import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import Switch from 'components/refactor/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const Template: Story['render'] = () => {
  const [selected, setSelected] = useState(false);

  return <Switch checked={selected} onChange={() => setSelected(!selected)} />;
};

export const Default: Story = {
  render: Template,
};
