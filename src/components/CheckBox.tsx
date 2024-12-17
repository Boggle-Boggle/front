import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa';

type CheckBoxProps = {
  isSquare?: boolean;
  color?: 'red' | 'accent';
  isChecked?: boolean;
  type?: 'plus' | 'minus' | 'checked';
};

const CheckBox = ({ isSquare, color = 'accent', type = 'checked', isChecked = true }: CheckBoxProps) => {
  return (
    <span
      className={`h-6 w-6 ${isSquare ? 'rounded-md' : 'rounded-full'} text-white ${isChecked ? `bg-${color}` : type === 'plus' ? 'bg-[#D9D9D9]' : 'bg-main'} flex items-center justify-center`}
    >
      {type === 'checked' && isChecked && <FaCheck />}
      {type === 'minus' && isChecked && <FaMinus />}
      {type === 'plus' && <FaPlus />}
    </span>
  );
};

export default CheckBox;
