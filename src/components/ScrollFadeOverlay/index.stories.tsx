import { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollFadeOverlay } from './index';

const items = Array.from({ length: 12 }, (_, index) => ({ id: index + 1, label: `Item ${index + 1}` }));

const ScrollFadeOverlayPreview = () => {
  return (
    <div className="w-full max-w-xl rounded-xl border border-neutral-20 bg-white p-4">
      <div className="relative w-full overflow-hidden">
        <ul className="scrollbar-hide flex gap-3 overflow-x-auto pr-4">
          {items.map(({ id, label }) => (
            <li key={id} className="bg-neutral-10 h-20 w-28 shrink-0 rounded-lg p-3 text-title3 text-neutral-80">
              {label}
            </li>
          ))}
        </ul>
        <ScrollFadeOverlay edge="right" intensity="hard" className="w-16" />
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/ScrollFadeOverlay',
  component: ScrollFadeOverlay,
  tags: ['autodocs'],
  argTypes: {
    edge: {
      control: { type: 'radio' },
      options: ['left', 'right', 'both'],
    },
    intensity: {
      control: { type: 'radio' },
      options: ['soft', 'hard'],
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof ScrollFadeOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    edge: 'right',
    intensity: 'hard',
    className: 'w-16',
  },
  render: (args) => {
    return (
      <div className="w-full max-w-xl rounded-xl border border-neutral-20 bg-white p-4">
        <div className="relative w-full overflow-hidden">
          <ul className="scrollbar-hide flex gap-3 overflow-x-auto pr-4">
            {items.map(({ id, label }) => (
              <li key={id} className="bg-neutral-10 h-20 w-28 shrink-0 rounded-lg p-3 text-title3 text-neutral-80">
                {label}
              </li>
            ))}
          </ul>
          <ScrollFadeOverlay {...args} />
        </div>
      </div>
    );
  },
};

export const HardRight: Story = {
  render: () => <ScrollFadeOverlayPreview />,
};
