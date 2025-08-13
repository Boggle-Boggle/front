type CheckBoxProps = {
  id: string;
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey';
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ id, size = 'medium', variant = 'primary', checked = false, onChange }: CheckBoxProps) => {
  const variantClass =
    variant === 'primary'
      ? 'border-neutral-40 peer-checked:bg-primary '
      : 'border-neutral-60 peer-checked:bg-neutral-80 ';
  const sizeClass = size === 'small' ? 'size-3 text-body2' : 'size-6  text-title2';

  return (
    <label htmlFor={`checkbox-${id}`}>
      <input id={`checkbox-${id}`} type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <span
        className={`flex items-center justify-center rounded-[4px] border-[1.5px] text-neutral-0 peer-checked:border-transparent ${variantClass} ${sizeClass}`}
      >
        {checked && '✓'}
      </span>
    </label>
  );
};

export default CheckBox;
