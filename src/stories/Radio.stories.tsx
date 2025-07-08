/* eslint-disable react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import Radio from 'components/refactor/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'grey'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: Story['render'] = (args) => {
  const [selected, setSelected] = useState('option1');

  return (
    <div className="flex flex-col">
      <Radio
        {...args}
        id="option1"
        name="group"
        checked={selected === 'option1'}
        onChange={() => setSelected('option1')}
      />
      <div className="h-2" />
      <Radio
        {...args}
        id="option2"
        name="group"
        checked={selected === 'option2'}
        onChange={() => setSelected('option2')}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    size: 'medium',
    variant: 'primary',
  },
};
