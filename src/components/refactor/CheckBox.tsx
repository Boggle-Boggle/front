type CheckBoxProps = {
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey';
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ size = 'medium', variant = 'primary', checked = false, onChange }: CheckBoxProps) => {
  const variantClass =
    variant === 'primary'
      ? 'border-neutral-40 peer-checked:bg-primary '
      : 'border-neutral-60 peer-checked:bg-neutral-80 ';
  const sizeClass = size === 'small' ? 'h-3 w-3 text-body2' : 'h-6 w-6  text-title2';

  return (
    <label htmlFor="checkbox">
      <input id="checkbox" type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <span
        className={`flex items-center justify-center rounded-[4px] border-[1.5px] text-neutral-0 peer-checked:border-transparent ${variantClass} ${sizeClass}`}
      >
        {checked && '✓'}
      </span>
    </label>
  );
};

export default CheckBox;
