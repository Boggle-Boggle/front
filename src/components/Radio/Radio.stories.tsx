import { Meta, StoryObj } from '@storybook/react-vite';

import { ChangeEvent, ComponentProps, useEffect, useState } from 'react';

import { Radio } from 'components/Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
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
  render: (args) => {
    const [value, setValue] = useState<'a' | 'b'>(args.checked ? 'a' : 'b');

    useEffect(() => {
      setValue(args.checked ? 'a' : 'b');
    }, [args.checked]);

    const handleChangeA = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('a');
      args.onChange(e);
    };

    const handleChangeB = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('b');
      args.onChange(e);
    };

    return (
      <div className="flex gap-3">
        <Radio {...args} id="radio-a" checked={value === 'a'} onChange={handleChangeA} />
        <Radio {...args} id="radio-b" checked={value === 'b'} onChange={handleChangeB} />
      </div>
    );
  },
};

export const Unchecked: Story = {
  args: {
    ...radioArgs,
    checked: false,
  },
  render: (args) => {
    const [value, setValue] = useState<'a' | 'b'>(args.checked ? 'a' : 'b');

    useEffect(() => {
      setValue(args.checked ? 'a' : 'b');
    }, [args.checked]);

    const handleChangeA = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('a');
      args.onChange(e);
    };

    const handleChangeB = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('b');
      args.onChange(e);
    };

    return (
      <div className="flex gap-3">
        <Radio {...args} id="radio-a" checked={value === 'a'} onChange={handleChangeA} />
        <Radio {...args} id="radio-b" checked={value === 'b'} onChange={handleChangeB} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    ...radioArgs,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<'a' | 'b'>(args.checked ? 'a' : 'b');

    useEffect(() => {
      setValue(args.checked ? 'a' : 'b');
    }, [args.checked]);

    const handleChangeA = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('a');
      args.onChange(e);
    };

    const handleChangeB = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('b');
      args.onChange(e);
    };

    return (
      <div className="flex gap-3">
        <Radio {...args} id="radio-a" checked={value === 'a'} onChange={handleChangeA} />
        <Radio {...args} id="radio-b" checked={value === 'b'} onChange={handleChangeB} />
      </div>
    );
  },
};

export const SmallGrey: Story = {
  args: {
    ...radioArgs,
    size: 'small',
    variant: 'grey',
  },
  render: (args) => {
    const [value, setValue] = useState<'a' | 'b'>(args.checked ? 'a' : 'b');

    useEffect(() => {
      setValue(args.checked ? 'a' : 'b');
    }, [args.checked]);

    const handleChangeA = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('a');
      args.onChange(e);
    };

    const handleChangeB = (e: ChangeEvent<HTMLInputElement>) => {
      setValue('b');
      args.onChange(e);
    };

    return (
      <div className="flex gap-3">
        <Radio {...args} id="radio-a" checked={value === 'a'} onChange={handleChangeA} />
        <Radio {...args} id="radio-b" checked={value === 'b'} onChange={handleChangeB} />
      </div>
    );
  },
};
