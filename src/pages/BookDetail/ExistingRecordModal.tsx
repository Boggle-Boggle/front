import Modal from 'components/ui/Modal';
import Book1 from '../../assets/book1.png';
import Button from 'components/ui/Button';

type ExistingRecordModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
};

const ExistingRecordModal = ({ isOpen, close, scrollPos }: ExistingRecordModalProps) => {
  const handleClick = () => {
    console.log('이어서 작성하기');
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close} scrollPos={scrollPos}>
          <div className="flex min-h-[400px] w-72 flex-col items-center justify-center">
            <img src={Book1} className="h-36 w-36" />
            <h1 className="py-5 text-base font-bold">이전 기록이 있어요!</h1>
            <p className="text-center text-sm">
              <span className="relative inline-block">
                <span className="relative z-10">파과를 2024년 06월 19일</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-accent opacity-50" />
                <span className="absolute bottom-1 right-0 h-3 w-1 bg-accent opacity-50" />
              </span>
              에 읽은적이 있네요 <br />
              회독 기간을 추가하고 이어서 작성해보세요
            </p>
            <Button handleClick={handleClick} className="mt-7 h-12 w-3/4 font-bold">
              이어서 작성하기
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExistingRecordModal;
