import { Meta, StoryObj } from '@storybook/react-vite';

import { MemoryRouter } from 'react-router-dom';

import { Header } from './index';
import Search from '../icons/Search';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    leftBtn: { control: false },
    rightBtn: { control: false },
    withBack: { control: 'boolean' },
    withSpacer: { control: 'boolean' },
    transparent: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: '페이지 타이틀',
    withSpacer: false,
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    transparent: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const WithBack: Story = {
  args: {
    ...Default.args,
    withBack: true,
  },
};

export const WithRightButton: Story = {
  args: {
    ...Default.args,
    rightBtn: (
      <button className="px-4" aria-label="label" type="button">
        <Search />
      </button>
    ),
  },
};
