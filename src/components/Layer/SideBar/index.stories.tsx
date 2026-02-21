import { Meta, StoryObj } from '@storybook/react-vite';

import { SideBar } from '.';

const meta = {
  title: 'Components/Layer/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the sidebar',
    },
  },
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-full w-full flex-col gap-4 p-6">
        <h2 className="text-xl font-bold">SideBar Content</h2>
        <ul className="space-y-2">
          <li className="rounded p-2 hover:bg-gray-100">Menu Item 1</li>
          <li className="rounded p-2 hover:bg-gray-100">Menu Item 2</li>
          <li className="rounded p-2 hover:bg-gray-100">Menu Item 3</li>
        </ul>
      </div>
    ),
  },
};
