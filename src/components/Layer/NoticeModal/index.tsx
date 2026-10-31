import { ReactNode } from 'react';

import { IconButton, TextButton } from 'components/Button';
import { IconCancel } from 'components/icons';

import { Modal } from '../Modal';

type NoticeDismissPeriod = 'day' | 'week' | 'month';

type NoticeModalProps = {
  children: ReactNode;
  onClose: () => void;
  onDismiss: (period: NoticeDismissPeriod) => void;
  dismissPeriod: NoticeDismissPeriod;
  closeLabel?: string;
};

const MSG_DISMISS_BY_PERIOD: Record<NoticeDismissPeriod, string> = {
  day: '하루간 보지 않기',
  week: '일주일간 보지 않기',
  month: '한 달간 보지 않기',
};
const MSG_CLOSE = '닫기';

export const NoticeModal = (props: NoticeModalProps) => {
  const {
    children,
    onClose,
    onDismiss,
    dismissPeriod,
    closeLabel = MSG_CLOSE,
  } = props;

  const handleDismiss = () => onDismiss(dismissPeriod);

  return (
    <Modal className="overflow-hidden !max-w-[22rem] !rounded-[1.5rem] !p-0">
      <div className="relative aspect-[4/5] overflow-hidden">
        {children}
        <IconButton onClick={onClose} label={closeLabel} size="md" icon={IconCancel} className="absolute right-0 top-0 text-neutral-40" />
      </div>
      <div className="flex h-12 items-center justify-between px-5">
        <TextButton onClick={handleDismiss} text={MSG_DISMISS_BY_PERIOD[dismissPeriod]} size="sm" />
        <TextButton onClick={onClose} text={closeLabel} size="sm" />
      </div>
    </Modal>
  );
};
