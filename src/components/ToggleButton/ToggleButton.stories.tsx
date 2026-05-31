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

const StatefulToggleButton = (args: ComponentProps<typeof ToggleButton>) => {
  const { selected: initialSelected, onClick, ...restArgs } = args;
  const [selected, setSelected] = useState<boolean>(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected((prev) => !prev);
    onClick(e);
  };

  return <ToggleButton {...restArgs} selected={selected} onClick={handleClick} />;
};

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
  render: StatefulToggleButton,
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
  render: StatefulToggleButton,
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
  render: StatefulToggleButton,
};

export const VariantMatrix: Story = {
  args: {
    variant: 'icon',
    selected: false,
    onClick: () => {},
    icon: IconHeart,
    selectedIcon: IconHeartFilled,
    disabled: false,
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4 bg-neutral-0 p-6">
        <div className="flex items-center gap-3">
          <StatefulToggleButton
            variant="iconText"
            selected={false}
            onClick={() => {}}
            icon={IconHeart}
            label="관심 도서"
          />
          <StatefulToggleButton
            variant="iconText"
            selected
            onClick={() => {}}
            icon={IconHeart}
            selectedIcon={IconHeartFilled}
            label="관심 도서"
          />
        </div>

        <div className="flex items-center gap-3">
          <StatefulToggleButton variant="iconCount" selected={false} onClick={() => {}} icon={IconHeart} count={99} />
          <StatefulToggleButton
            variant="iconCount"
            selected
            onClick={() => {}}
            icon={IconHeart}
            selectedIcon={IconHeartFilled}
            count={100}
          />
        </div>

        <div className="flex items-center gap-3">
          <StatefulToggleButton variant="icon" selected={false} onClick={() => {}} icon={IconHeart} />
          <StatefulToggleButton
            variant="icon"
            selected
            onClick={() => {}}
            icon={IconHeart}
            selectedIcon={IconHeartFilled}
          />
        </div>
      </div>
    );
  },
};
