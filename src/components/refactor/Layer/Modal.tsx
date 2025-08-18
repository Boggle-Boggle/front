import useLayer from 'hooks/useLayer';

import LayerBackground from './LayerBackground';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const { mounted, visible, handleAnimationEnd, handleClose } = useLayer();

  return (
    mounted && (
      <>
        <LayerBackground onClose={handleClose} />
        <div
          onAnimationEnd={handleAnimationEnd}
          style={{ boxShadow: '0px 2px 20px 0px #00000029' }}
          className={`absolute left-1/2 top-1/2 z-layer w-[calc(100%-2rem)] max-w-mobile -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-neutral-0 ${
            visible ? 'animate-fadeIn' : 'animate-fadeOut'
          }`}
        >
          {children}
        </div>
      </>
    )
  );
};

export default Modal;
