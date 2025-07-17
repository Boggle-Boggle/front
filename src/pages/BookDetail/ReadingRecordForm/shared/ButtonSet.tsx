import Button from 'components/Button';

type ButtonSetProps = {
  onPrev?: () => void;
  onNext: () => void;
};

const ButtonSet = ({ onPrev, onNext }: ButtonSetProps) => {
  return onPrev ? (
    <section className="mt-6 flex justify-between">
      <Button handleClick={onPrev} className="w-2/5 bg-main text-black shadow-sm">
        이전
      </Button>
      <Button handleClick={onNext} className="w-2/5 text-white shadow-sm">
        다음
      </Button>
    </section>
  ) : (
    <Button handleClick={onNext}>다음 </Button>
  );
};

export default ButtonSet;
