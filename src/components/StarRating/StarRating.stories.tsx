import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps, useEffect, useState } from 'react';

import { StarRating } from 'components/StarRating';

const meta = {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    size: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    readOnly: { control: { type: 'boolean' } },
    onChange: { action: 'changed' },
    ariaLabel: { control: { type: 'text' } },
  },
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

const starRatingArgs: ComponentProps<typeof StarRating> = {
  value: 3.5,
  size: 20,
  max: 5,
  readOnly: true,
  onChange: () => {},
};

export const ReadOnly: Story = {
  args: {
    ...starRatingArgs,
    readOnly: true,
  },
};

export const Editable: Story = {
  args: {
    ...starRatingArgs,
    readOnly: false,
  },
  render: (args) => {
    const [value, setValue] = useState<number>(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    const handleChange = (nextValue: number) => {
      setValue(nextValue);
      args.onChange?.(nextValue);
    };

    return <StarRating {...args} value={value} onChange={handleChange} />;
  },
};

export const Half: Story = {
  args: {
    ...starRatingArgs,
    value: 2.5,
    readOnly: true,
  },
};

export const CustomSize: Story = {
  args: {
    ...starRatingArgs,
    value: 4,
    size: 32,
    readOnly: true,
  },
};
