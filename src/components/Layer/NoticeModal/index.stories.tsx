import { Meta, StoryObj } from '@storybook/react-vite';

import renewalNoticeImage from 'assets/notice/20261031_renewal-notice.png';

import { NoticeModal } from '.';

const meta = {
  title: 'Components/Layer/NoticeModal',
  component: NoticeModal,
  tags: ['autodocs'],
  argTypes: {
    dismissPeriod: { control: 'select', options: ['day', 'week', 'month'] },
  },
} satisfies Meta<typeof NoticeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = () => {};

export const Default: Story = {
  args: {
    onClose: handleClick,
    onDismiss: handleClick,
    dismissPeriod: 'day',
    children: <div className="grid h-full place-items-center bg-neutral-20 text-body1">프로모션 콘텐츠</div>,
  },
  render: (args) => <NoticeModal {...args} />,
};

export const RenewalNotice: Story = {
  args: {
    onClose: handleClick,
    onDismiss: handleClick,
    dismissPeriod: 'day',
    children: <img src={renewalNoticeImage} alt="빼곡이 새로워졌어요" className="h-full w-full object-cover" />,
  },
  render: (args) => <NoticeModal {...args} />,
};
