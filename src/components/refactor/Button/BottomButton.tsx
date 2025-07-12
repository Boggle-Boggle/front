import Button from './Button';
import { ButtonProps } from './type';

const BottomButton = (props: ButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-fixedBtn w-full bg-white px-mobile pb-safe-bottom">
      <Button {...props} />
    </div>
  );
};

export default BottomButton;
