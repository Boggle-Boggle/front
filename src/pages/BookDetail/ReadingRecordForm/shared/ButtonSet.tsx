import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import Button from 'components/ui/Button';

type ButtonSetProps = {
  onPrev?: () => void;
  onNext: () => void;
};

const ButtonSet = ({ onPrev, onNext }: ButtonSetProps) => {
  return onPrev ? (
    <section className="mt-6 flex justify-between">
      <Button handleClick={onPrev} className="w-2/5 bg-main text-black shadow-sm">
        <GoChevronLeft />
        이전
      </Button>
      <Button handleClick={onNext} className="w-2/5 text-white shadow-sm">
        다음 <GoChevronRight />
      </Button>
    </section>
  ) : (
    <Button handleClick={onNext}>
      다음 <GoChevronRight />
    </Button>
  );
};

export default ButtonSet;
