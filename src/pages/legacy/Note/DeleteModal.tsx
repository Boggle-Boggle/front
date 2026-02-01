import Button from 'components/Button';
import Modal from 'components/Modal';

type DeleteModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
  deleteNote: () => void;
};

const DeleteModal = ({ isOpen, close, scrollPos, deleteNote }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} scrollPos={scrollPos} onClose={close} hasCloseMark={false}>
      <section className="w-80 px-5 py-6 text-center">
        <p className="text-lg font-semibold">독서 노트를 삭제할까요?</p>
        <p className="text-sm opacity-50">삭제된 독서노트는 복구가 어려워요</p>

        <section className="mt-7 grid grid-cols-2 gap-3">
          <Button handleClick={close} className="bg-main">
            취소
          </Button>
          <Button handleClick={deleteNote}>삭제</Button>
        </section>
      </section>
    </Modal>
  );
};

export default DeleteModal;
