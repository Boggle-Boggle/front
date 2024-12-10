import visible from 'assets/visible.png';

import ButtonSet from './shared/ButtonSet';
import CheckBox from './shared/CheckBox';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type VisiableProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPrev: () => void;
  onNext: () => void;
};

const Visiable = ({ isVisible, setIsVisible, onPrev, onNext }: VisiableProps) => {
  return (
    <>
      <Title message="책을 책장에서 숨기고 싶으신가요?" />
      <SubTitle
        message={`등록시 기본적으로 책장에 책이 꽂히게 됩니다.\n책장에서 책을 숨기고 싶다면 아래 체크박스에 체크해주세요`}
      />

      <img src={visible} className="mx-auto" />
      <li
        className={`mb-8 flex items-center justify-between rounded-[10px] bg-white p-4 font-semibold shadow-md ${status && 'border-2 border-accent'}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        책장에서 책 숨기기
        <CheckBox isChecked={isVisible} />
      </li>

      <ButtonSet onPrev={onPrev} onNext={onNext} />
    </>
  );
};

export default Visiable;
