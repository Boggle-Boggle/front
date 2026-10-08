import { useRef } from 'react';

import { useBottomOverlayHeight } from 'hooks/useBottomOverlayHeight';

import Button from './Button';
import { ButtonProps } from './type';

const BottomButton = (props: ButtonProps) => {
  const bottomButtonRef = useRef<HTMLDivElement>(null);
  useBottomOverlayHeight(bottomButtonRef);

  return (
    <>
      <div className="h-24 shrink-0 pb-safe-bottom" />
      <div
        ref={bottomButtonRef}
        className="fixed inset-x-0 bottom-0 z-fixedBtn mx-auto w-full max-w-mobile bg-neutral-0 px-mobile pb-safe-bottom pt-4"
      >
        <Button {...props} />
      </div>
    </>
  );
};

export default BottomButton;
