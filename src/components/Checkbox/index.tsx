import { ChangeEvent } from 'react';

import { IconCheckMark } from '../icons';

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  size?: 'mini' | 'regular';
  variant?: 'color' | 'black';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const {
    id,
    checked,
    onChange,
    name,
    size = 'regular',
    variant = 'color',
    disabled = false,
    className = '',
    ariaLabel,
  } = props;

  const labelClass = 'inline-flex items-center justify-center';
  const disabledClass = disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer';
  const boxSizeClass = size === 'mini' ? 'size-3' : 'size-6';
  const radiusClass = size === 'mini' ? 'rounded-[2px]' : 'rounded-[4px]';
  const borderColorClass = variant === 'color' ? 'border-neutral-40' : 'border-neutral-60';
  const checkedColorClass = variant === 'color' ? 'bg-primary' : 'bg-neutral-80';
  const boxColorClass = checked ? checkedColorClass : 'bg-neutral-0';
  const borderClass = checked ? 'border-[1.5px] border-transparent' : `border-[1.5px] ${borderColorClass}`;
  const checkIconClass = size === 'mini' ? 'h-2 w-3' : 'h-3 w-4';

  return (
    <label htmlFor={id} className={`${labelClass} ${disabledClass} ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel ?? id}
        className="peer sr-only"
      />
      <span
        className={`flex items-center justify-center ${boxSizeClass} ${radiusClass} ${boxColorClass} ${borderClass}`}
      >
        {checked ? <IconCheckMark className={checkIconClass} aria-hidden="true" /> : null}
      </span>
    </label>
  );
};
