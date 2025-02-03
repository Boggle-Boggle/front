import Button from 'components/Button';
import Icon from 'components/Icon';

import { CommonNext, CommonPrev } from 'assets/icons';

type ButtonSetProps = {
  onPrev?: () => void;
  onNext: () => void;
};

const ButtonSet = ({ onPrev, onNext }: ButtonSetProps) => {
  return onPrev ? (
    <section className="mt-6 flex justify-between">
      <Button handleClick={onPrev} className="w-2/5 bg-main text-black shadow-sm">
        <Icon Component={CommonPrev} size="xs" />
        이전
      </Button>
      <Button handleClick={onNext} className="w-2/5 text-white shadow-sm">
        다음
        <Icon Component={CommonNext} size="xs" />
      </Button>
    </section>
  ) : (
    <Button handleClick={onNext}>
      다음 <Icon Component={CommonNext} size="xs" style={{ color: '#ffffff' }} />
    </Button>
  );
};

export default ButtonSet;
