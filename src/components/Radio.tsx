type RadioProps = {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey';
  checked: boolean;
};

const Radio = ({ id, name, checked, onChange, size = 'medium', variant = 'primary' }: RadioProps) => {
  const variantInnerClass = variant === 'primary' ? 'bg-primary' : 'bg-neutral-80 ';
  const variantOuterClass =
    variant === 'primary'
      ? 'border-neutral-40 peer-checked:border-primary'
      : 'border-neutral-80 peer-checked:border-neutral-80';

  const sizeInnerClass = size === 'small' ? 'h-[10.7px] w-[10.7px]' : 'h-[15px] w-[15px]';
  const sizeOuterClass = size === 'small' ? 'size-4' : 'size-6';

  return (
    <label htmlFor={id}>
      <input id={id} name={name} type="radio" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex items-center justify-center rounded-full border bg-neutral-0 ${sizeOuterClass} ${variantOuterClass} `}
      >
        {checked && <span className={`block rounded-full ${sizeInnerClass} ${variantInnerClass}`} />}
      </span>
    </label>
  );
};

export default Radio;
