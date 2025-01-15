import { FaXmark } from 'react-icons/fa6';

type HalfScreenModalProps = {
  children: React.ReactNode;
  handleClose?: () => void;
  hasCloseMark?: boolean;
  bgColor?: string;
};

const HalfScreenModal = ({
  children,
  handleClose,
  hasCloseMark = false,
  bgColor = 'bg-main',
}: HalfScreenModalProps) => {
  return (
    <>
      <button
        className="absolute top-0 z-20 h-full w-full bg-black opacity-40"
        aria-label="취소"
        type="button"
        onClick={handleClose}
      />
      <section className={`min-h-1/2 absolute bottom-0 z-30 w-full rounded-2xl ${bgColor}`}>
        {hasCloseMark && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-40 opacity-50"
            aria-label="닫기"
          >
            <FaXmark style={{ width: '20px', height: '20px' }} />
          </button>
        )}

        {children}
      </section>
    </>
  );
};

export default HalfScreenModal;
