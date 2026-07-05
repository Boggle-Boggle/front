import { ReactNode } from 'react';

import { IconButton } from 'components/Button';
import { IconCancel } from 'components/icons';

import { Modal } from '../Modal';

type ContentModalProps = {
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const ContentModal = (props: ContentModalProps) => {
  const { title, onClose, footer, children, className } = props;
  const modalClassName = className ? `flex flex-col ${className}` : 'flex flex-col gap-6 px-4 pb-6 pt-4';

  return (
    <Modal className={modalClassName}>
      <div className="relative flex min-h-12 items-center justify-center">
        <p className="text-center text-body1">{title}</p>
        <IconButton onClick={onClose} label="닫기" size="md" icon={IconCancel} className="absolute right-0" />
      </div>

      {children}
      {footer}
    </Modal>
  );
};
