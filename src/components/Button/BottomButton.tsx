import Button from './Button';
import { ButtonProps } from './type';

const BottomButton = (props: ButtonProps) => {
  return (
    <>
      <div className="h-16 pb-safe-bottom" />
      <div className="fixed inset-x-0 bottom-0 z-fixedBtn mx-auto w-full max-w-mobile bg-neutral-0 px-mobile pb-safe-bottom pt-4">
        <Button {...props} />
      </div>
    </>
  );
};

export default BottomButton;
