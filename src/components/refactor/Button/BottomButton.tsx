import Button from './Button';
import { ButtonProps } from './type';

const BottomButton = (props: ButtonProps) => {
  const { size } = props;

  return (
    <>
      <div className={`mb-safe-bottom ${size === 'small' ? 'h-11' : 'h-14'}`} />
      <div className="fixed bottom-0 left-1/2 z-fixedBtn w-full max-w-mobile -translate-x-1/2 bg-neutral-0 px-mobile pb-safe-bottom pt-2">
        <Button {...props} />
      </div>
    </>
  );
};

export default BottomButton;
