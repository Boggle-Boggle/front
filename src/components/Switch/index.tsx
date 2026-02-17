import { ChangeEvent, useId } from 'react';

type SwitchProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  ariaLabel?: string;
};

export const Switch = (props: SwitchProps) => {
  const { checked = false, onChange, disabled = false, id, className = '', ariaLabel = '스위치' } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;

  const labelClass = 'inline-flex items-center';
  const disabledClass = disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer';
  const trackBaseClass = 'relative block h-5 w-9 rounded-[23px] p-[1px]';
  const trackStateClass = checked ? 'bg-primary' : 'bg-neutral-40';
  const handlePositionClass = checked ? 'left-[1.063rem]' : 'left-[0.063rem]';
  const handleClass = 'absolute size-[1.125rem] rounded-full border-neutral-0 bg-neutral-0 transition-all duration-300';

  return (
    <label htmlFor={inputId} className={`${labelClass} ${disabledClass} ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <span className={`${trackBaseClass} ${trackStateClass}`}>
        <span className={`${handleClass} ${handlePositionClass}`} />
      </span>
    </label>
  );
};
