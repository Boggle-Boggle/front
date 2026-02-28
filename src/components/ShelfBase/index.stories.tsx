import { Meta, StoryObj } from '@storybook/react-vite';

import { ShelfBase } from './index';

const meta = {
  title: 'Components/ShelfBase',
  component: ShelfBase,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'number' },
    },
    gradient: {
      control: { type: 'text' },
    },
    layerOpacity: {
      control: { type: 'number' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="w-full max-w-[375px] rounded-lg border border-neutral-20 bg-neutral-0 p-4">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ShelfBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: 35,
    layerOpacity: 0.5,
  },
};

export const TallerShelf: Story = {
  args: {
    height: 42,
    layerOpacity: 0.5,
  },
};

export const WarmGradient: Story = {
  args: {
    height: 35,
    layerOpacity: 0.5,
    gradient: 'linear-gradient(180deg, rgba(237, 225, 210, 1) 0%, rgba(255, 250, 245, 1) 100%)',
  },
};

export const ComposedStack: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <ShelfBase />
        <ShelfBase height={30} />
      </div>
    );
  },
};
