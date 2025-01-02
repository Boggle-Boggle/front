import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa';

type CheckBoxProps = {
  isSquare?: boolean;
  color?: 'red' | 'accent';
  isChecked?: boolean;
  type?: 'plus' | 'minus' | 'checked';
  handleClick?: () => void;
};

const CheckBox = ({ isSquare, color = 'accent', type = 'checked', isChecked = true, handleClick }: CheckBoxProps) => {
  const currentColor = color === 'red' ? 'bg-red' : 'bg-accent';

  return (
    <button
      className={`h-6 w-6 ${isSquare ? 'rounded-md' : 'rounded-full'} text-white ${isChecked ? currentColor : type === 'plus' ? 'bg-[#D9D9D9]' : 'bg-main'} flex items-center justify-center`}
      type="button"
      onClick={handleClick}
    >
      {type === 'checked' && isChecked && <FaCheck />}
      {type === 'minus' && isChecked && <FaMinus />}
      {type === 'plus' && <FaPlus />}
    </button>
  );
};

export default CheckBox;
