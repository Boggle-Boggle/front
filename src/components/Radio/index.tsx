import { ChangeEvent } from 'react';

type RadioProps = {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey';
  checked: boolean;
  disabled?: boolean;
  className?: string;
};

export const Radio = (props: RadioProps) => {
  const { id, name, checked, onChange, size = 'medium', variant = 'primary', disabled = false, className = '' } = props;

  const baseClass = 'flex items-center justify-center rounded-full border bg-neutral-0';
  const labelClass = 'inline-flex items-center justify-center';
  const disabledClass = disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer';
  const variantInnerClass = variant === 'primary' ? 'bg-primary' : 'bg-neutral-80';
  const variantOuterClass =
    variant === 'primary'
      ? 'border-neutral-40 peer-checked:border-primary'
      : 'border-neutral-80 peer-checked:border-neutral-80';
  const sizeInnerClass = size === 'small' ? 'h-[10.7px] w-[10.7px]' : 'h-[15px] w-[15px]';
  const sizeOuterClass = size === 'small' ? 'size-4' : 'size-6';

  return (
    <label htmlFor={id} className={`${labelClass} ${disabledClass} ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span className={`${baseClass} ${sizeOuterClass} ${variantOuterClass}`}>
        {checked ? <span className={`block rounded-full ${sizeInnerClass} ${variantInnerClass}`} /> : null}
      </span>
    </label>
  );
};
