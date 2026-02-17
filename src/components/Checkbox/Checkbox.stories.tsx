import { Meta, StoryObj } from '@storybook/react-vite';

import { ChangeEvent, ComponentProps, useEffect, useState } from 'react';

import { Checkbox } from 'components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
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
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked);

    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  },
};

export const Checked: Story = {
  args: {
    ...checkboxArgs,
    checked: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked);

    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  },
};

export const Disabled: Story = {
  args: {
    ...checkboxArgs,
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked);

    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  },
};

export const MiniBlack: Story = {
  args: {
    ...checkboxArgs,
    size: 'mini',
    variant: 'black',
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked);

    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      args.onChange(e);
    };

    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  },
};
