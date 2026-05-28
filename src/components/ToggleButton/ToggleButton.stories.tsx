import { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps, MouseEvent, useEffect, useState } from 'react';

import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['icon', 'iconText', 'iconCount'],
    },
    icon: { control: false },
    selectedIcon: { control: false },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const iconTextArgs: ComponentProps<typeof ToggleButton> = {
  variant: 'iconText',
  selected: false,
  onClick: () => {},
  icon: IconHeart,
  selectedIcon: IconHeartFilled,
  label: '관심 도서',
  disabled: false,
};

export const IconText: Story = {
  args: {
    ...iconTextArgs,
  },
  render: (args) => {
    const [selected, setSelected] = useState<boolean>(args.selected);

    useEffect(() => {
      setSelected(args.selected);
    }, [args.selected]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelected((prev) => !prev);
      args.onClick(e);
    };

    return <ToggleButton {...args} selected={selected} onClick={handleClick} />;
  },
};

export const IconCount: Story = {
  args: {
    variant: 'iconCount',
    selected: true,
    onClick: () => {},
    icon: IconHeart,
    selectedIcon: IconHeartFilled,
    count: 13,
    disabled: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<boolean>(args.selected);

    useEffect(() => {
      setSelected(args.selected);
    }, [args.selected]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelected((prev) => !prev);
      args.onClick(e);
    };

    return <ToggleButton {...args} selected={selected} onClick={handleClick} />;
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    selected: true,
    onClick: () => {},
    icon: IconHeart,
    selectedIcon: IconHeartFilled,
    disabled: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<boolean>(args.selected);

    useEffect(() => {
      setSelected(args.selected);
    }, [args.selected]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelected((prev) => !prev);
      args.onClick(e);
    };

    return <ToggleButton {...args} selected={selected} onClick={handleClick} />;
  },
};
