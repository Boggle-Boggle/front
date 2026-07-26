import { ReactNode } from 'react';

import { IconButton } from 'components/Button';
import { IconCancel } from 'components/icons';

import { Modal } from '../Modal';

type ContentModalProps = {
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children?: ReactNode;
};

export const ContentModal = (props: ContentModalProps) => {
  const { title, onClose, footer, children } = props;

  return (
    <Modal className="flex flex-col px-4 pb-6 pt-4">
      <div className="flex items-center justify-center pb-6 pt-4">
        <p className="text-center text-body1">{title}</p>
        <IconButton onClick={onClose} label="닫기" size="md" icon={IconCancel} className="absolute right-2" />
      </div>
      {children}
      {footer}
    </Modal>
  );
};
