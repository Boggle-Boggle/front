import { createPortal } from 'react-dom';

import { CommonCancel } from 'assets/icons';

import Icon from './Icon';

type HalfScreenModalProps = {
  children: React.ReactNode;
  handleClose?: () => void;
  hasCloseMark?: boolean;
  bgColor?: string;
};

// TODO : 아이콘 확인하기
const HalfScreenModal = ({
  children,
  handleClose,
  hasCloseMark = false,
  bgColor = 'bg-main',
}: HalfScreenModalProps) => {
  return createPortal(
    <section className="flex items-center justify-center">
      <button
        className="absolute top-0 z-40 h-full w-full bg-black opacity-40"
        aria-label="취소"
        type="button"
        onClick={handleClose}
      />
      <section
        className={`fixed bottom-0 z-40 m-auto flex max-h-[70%] min-h-[50%] w-full max-w-screen-sm flex-col rounded-t-2xl ${bgColor}`}
      >
        {hasCloseMark && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-40 opacity-50"
            aria-label="닫기"
          >
            <Icon Component={CommonCancel} />
          </button>
        )}
        <section className="overflow-auto">{children}</section>
      </section>
    </section>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default HalfScreenModal;
