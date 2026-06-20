import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { ActionModal, ContentModal, Modal } from '.';

const meta = {
  title: 'Components/Layer/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = () => {};

export const Primitive: Story = {
  render: () => {
    return (
      <Modal>
        <div className="flex flex-col gap-4">
          <h2 className="text-title2">Primitive Modal</h2>
          <p className="text-body1 text-neutral-60">기존 사용처와 호환되는 기본 쉘입니다.</p>
        </div>
      </Modal>
    );
  },
};

export const Action: Story = {
  render: () => {
    return (
      <ActionModal
        title="타이틀을 입력해주세요"
        description="내용을 입력해주세요"
        cancelLabel="아니오"
        confirmLabel="네"
        onCancel={handleClick}
        onConfirm={handleClick}
        confirmVariant="warning"
      />
    );
  },
};

export const Content: Story = {
  render: () => {
    return (
      <ContentModal
        title="Title input"
        onClose={handleClick}
        footer={
          <Button onClick={handleClick} variant="primary">
            완료
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <Input value="" placeholder="내용을 입력해주세요" onChange={handleClick} />
          <div className="grid h-40 place-items-center rounded-xl bg-neutral-20 text-body1 text-neutral-60">contents</div>
        </div>
      </ContentModal>
    );
  },
};

export const ContentWithoutFooter: Story = {
  render: () => {
    return (
      <ContentModal title="공지" onClose={handleClick}>
        <div className="flex flex-col gap-2">
          <p className="text-body1 text-neutral-100">공지형 모달은 body 중심으로 정보를 전달합니다.</p>
          <p className="text-caption1 text-neutral-60">footer 없이도 사용할 수 있습니다.</p>
        </div>
      </ContentModal>
    );
  },
};
