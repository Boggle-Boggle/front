import { Meta, StoryObj } from '@storybook/react-vite';

import { ChangeEvent, ComponentProps, useEffect, useState } from 'react';

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
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked ?? false);

    useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Switch {...args} checked={checked} onChange={handleChange} />;
  },
};

export const Checked: Story = {
  args: {
    ...switchArgs,
    checked: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked ?? false);

    useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Switch {...args} checked={checked} onChange={handleChange} />;
  },
};

export const Disabled: Story = {
  args: {
    ...switchArgs,
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked ?? false);

    useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Switch {...args} checked={checked} onChange={handleChange} />;
  },
};
