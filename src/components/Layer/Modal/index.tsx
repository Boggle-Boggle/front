import { ReactNode } from 'react';

import useLayer from 'hooks/useLayer';

import LayerBackground from '../LayerBackground';

type ModalProps = {
  children: ReactNode;
  className?: string;
};

export const Modal = (props: ModalProps) => {
  const { children, className = '' } = props;
  const { mounted, visible, handleAnimationEnd, handleClose } = useLayer();
  const containerClassName = `absolute left-1/2 top-1/2 z-layer w-[calc(100%-2rem)] max-w-mobile -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-neutral-0 p-5 shadow-[0_0.125rem_1.25rem_rgba(0,0,0,0.16)] ${
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
