import { Button } from 'components/Button';

import { Modal } from '../Modal';

type ActionModalProps = {
  title: string;
  description?: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  isConfirmLoading?: boolean;
  confirmVariant?: 'primary' | 'warning' | 'grey';
};

export const ActionModal = (props: ActionModalProps) => {
  const {
    title,
    description,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    isConfirmLoading = false,
    confirmVariant = 'primary',
  } = props;

  return (
    <Modal>
      <div className="flex flex-col gap-1 pb-4">
        <h1 className="text-title2">{title}</h1>
        {description && <p className="whitespace-pre-line text-body1 text-neutral-60">{description}</p>}
      </div>

      <div className="flex items-center gap-1 text-body1">
        <Button onClick={onCancel} variant="grey" size="small" className="text-neutral-60">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} variant={confirmVariant} size="small" loading={isConfirmLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
