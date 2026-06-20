import { ReactNode } from 'react';

import { Button } from 'components/Button';
import { IconCancel } from 'components/icons';

import useLayer from 'hooks/useLayer';

import LayerBackground from '../LayerBackground';

type ModalLayerProps = {
  children: ReactNode;
  className?: string;
};

type ModalProps = {
  children: ReactNode;
};

type ActionModalProps = {
  title: string;
  description?: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmVariant?: 'primary' | 'warning' | 'grey';
};

type ContentModalProps = {
  title?: string;
  description?: string;
  onClose?: () => void;
  footer?: ReactNode;
  children?: ReactNode;
};

export const ModalLayer = (props: ModalLayerProps) => {
  const { children, className = '' } = props;
  const { mounted, visible, handleAnimationEnd, handleClose } = useLayer();
  const containerClassName = `absolute left-1/2 top-1/2 z-layer w-[calc(100%-2rem)] max-w-mobile -translate-x-1/2 -translate-y-1/2 ${
    visible ? 'animate-fadeIn' : 'animate-fadeOut'
  } ${className}`;

  return (
    mounted && (
      <>
        <LayerBackground onClose={handleClose} />
        <div onAnimationEnd={handleAnimationEnd} className={containerClassName}>
          {children}
        </div>
      </>
    )
  );
};

export const Modal = (props: ModalProps) => {
  const { children } = props;

  return (
    <ModalLayer className="rounded-[1.25rem] bg-neutral-0 p-5 shadow-[0_0.125rem_1.25rem_rgba(0,0,0,0.16)]">
      {children}
    </ModalLayer>
  );
};

export const ActionModal = (props: ActionModalProps) => {
  const {
    title,
    description,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    confirmVariant = 'primary',
  } = props;

  return (
    <ModalLayer className="rounded-[1.25rem] bg-neutral-0 p-5 shadow-[0_0.125rem_1.25rem_rgba(0,0,0,0.16)]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-title2 text-neutral-100">{title}</p>
          {description && <p className="text-body1 text-neutral-60">{description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onCancel} variant="grey">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} variant={confirmVariant}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </ModalLayer>
  );
};

export const ContentModal = (props: ContentModalProps) => {
  const { title, description, onClose, footer, children } = props;

  return (
    <ModalLayer className="rounded-[1.25rem] bg-neutral-0 px-4 pb-6 pt-4 shadow-[0_0.125rem_1.25rem_rgba(0,0,0,0.16)]">
      <div className="flex flex-col gap-6">
        {(title || onClose) && (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div />
            {title && <p className="text-center text-body1 text-neutral-100">{title}</p>}
            <div className="flex justify-end">
              {onClose && (
                <button type="button" onClick={onClose} aria-label="닫기" className="grid size-12 place-items-center">
                  <IconCancel className="size-6 text-neutral-100" />
                </button>
              )}
            </div>
          </div>
        )}

        {description && <p className="text-body1 text-neutral-60">{description}</p>}
        {children}
        {footer}
      </div>
    </ModalLayer>
  );
};
