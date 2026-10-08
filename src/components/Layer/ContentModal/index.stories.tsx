import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { ContentModal } from '.';

const meta = {
  title: 'Components/Layer/ContentModal',
  component: ContentModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ContentModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = () => {};

export const Default: Story = {
  args: {
    title: 'Title input',
    onClose: handleClick,
  },
  render: (args) => {
    return (
      <ContentModal
        {...args}
        footer={
          <Button onClick={handleClick} variant="primary">
            완료
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <Input value="" placeholder="내용을 입력해 주세요" onChange={handleClick} />
          <div className="grid h-40 place-items-center rounded-xl bg-neutral-20 text-body1 text-neutral-60">contents</div>
        </div>
      </ContentModal>
    );
  },
};

export const WithoutFooter: Story = {
  args: {
    title: '공지',
    onClose: handleClick,
  },
  render: (args) => {
    return (
      <ContentModal {...args}>
        <div className="flex flex-col gap-2">
          <p className="text-body1 text-neutral-100">공지형 모달은 body 중심으로 정보를 전달해요.</p>
          <p className="text-caption1 text-neutral-60">footer 없이도 사용할 수 있어요.</p>
        </div>
      </ContentModal>
    );
  },
};
