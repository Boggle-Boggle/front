import useLayer from 'hooks/useLayer';

import LayerBackground from './LayerBackground';

type BottomSheetProps = {
  children: React.ReactNode;
};

const BottomSheet = ({ children }: BottomSheetProps) => {
  const { mounted, visible, handleAnimationEnd, handleClose } = useLayer();

  return (
    mounted && (
      <>
        <LayerBackground onClose={handleClose} />
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`fixed bottom-0 left-0 right-0 z-layer mx-auto max-w-mobile rounded-t-[32px] bg-neutral-0 pb-safe-bottom ${
            visible ? 'animate-slideUp' : 'animate-slideDown'
          }`}
        >
          <button
            className="mb-5 grid h-[1.625rem] w-full place-items-center"
            onClick={handleClose}
            type="button"
            aria-label="닫기"
          >
            <div className="h-1 w-[4.4375rem] bg-neutral-20" />
          </button>
          {children}
        </div>
      </>
    )
  );
};

export default BottomSheet;
