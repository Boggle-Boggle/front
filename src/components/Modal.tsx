import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  scrollPos: number;
  hasCloseMark?: boolean;
};

const Modal = ({ onClose, children, isOpen, scrollPos, hasCloseMark = true }: ModalProps) => {
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
  }, [isOpen, scrollPos]);

  return createPortal(
    <div onClick={onClose} className="flex h-full w-full items-center justify-center" role="presentation">
      <div onClick={(e) => e.stopPropagation()} className="relative rounded-md bg-white" role="presentation">
        {children}
        {hasCloseMark && (
          <button type="button" onClick={onClose} className="absolute right-3 top-3" aria-label="닫기" />
        )}
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
