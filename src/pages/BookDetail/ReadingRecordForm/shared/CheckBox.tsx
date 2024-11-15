import checked from 'assets/checked.png';

type CheckBoxProps = {
  isChecked: boolean;
};
const CheckBox = ({ isChecked }: CheckBoxProps) => {
  return (
    <>
      <span className={`h-6 w-6 rounded-md ${isChecked ? 'bg-accent' : 'bg-main'}`}>
        <img src={checked} />
      </span>
    </>
  );
};

export default CheckBox;
