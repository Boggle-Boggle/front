import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  scrollPos: number;
};

const Modal = ({ onClose, children, isOpen, scrollPos }: ModalProps) => {
  useEffect(() => {
    const modal = document.getElementById('modal');

    if (isOpen) {
      document.documentElement.style.cssText = `
      position: fixed; 
      top: -${scrollPos}px;
      width: 100%;`;

      modal!.style.cssText = `
      z-index: 5000;
      position: fixed;
      overscroll-behavior-y: contain;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      `;
    }
    return () => {
      document.documentElement.style.cssText = '';
      modal!.style.cssText = '';
      window.scrollTo(0, scrollPos);
    };
  }, []);

  return createPortal(
    <div onClick={onClose} className="flex h-full w-full items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="relative rounded-md bg-white">
        {children}
        <button type="button" onClick={onClose} className="absolute right-4 top-4">
          닫기
        </button>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
