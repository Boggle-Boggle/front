import Button from 'components/Button';

import { DrawType } from 'types/user';

import DRAW_TYPE_LIST from 'constants/user';

type SelectDrawTypeProps = {
  onNext: () => void;
  drawType: DrawType | null;
  setDrawType: (type: DrawType | null) => void;
};

const SelectDrawType = ({ onNext, drawType, setDrawType }: SelectDrawTypeProps) => {
  const handleSelect = (type: DrawType) => {
    if (drawType === type) setDrawType(null);
    else setDrawType(type);
  };

  return (
    <>
      <h1 className="text-[2rem] font-semibold leading-[3rem]">
        탈퇴하시는
        <br />
        이유가 궁금해요
        <p className="pb-6 pt-2 text-base opacity-50">남겨주신 의견에 귀 기울여서 개선하는 빼곡이 될게요</p>
      </h1>

      <section className="flex w-full grow flex-col items-center overflow-scroll pb-4">
        {DRAW_TYPE_LIST.map((type) => (
          <li key={type} className="w-full">
            <button
              className={`mb-4 box-border flex w-full items-center justify-between rounded-[10px] border-2 bg-main px-4 py-3 text-[15px] ${type === drawType ? 'border-accent' : 'border-transparent'}`}
              onClick={() => handleSelect(type)}
              type="button"
            >
              {type}
            </button>
          </li>
        ))}
      </section>

      <div className="pt-6">
        <Button handleClick={onNext} disabled={drawType === null}>
          다음
        </Button>
      </div>
    </>
  );
};

export default SelectDrawType;
