import { forwardRef, ChangeEvent, FocusEvent } from 'react';

import Cancel from 'components/icons/Cancel';

export interface InputProps {
  variant?: 'default' | 'primary' | 'error' | 'disabled';
  margin?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant = 'default',
    margin = '',
    value,
    onClear,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    name,
    placeholder,
    maxLength,
  } = props;

  const isError = variant === 'error';
  const isDisabled = variant === 'disabled';

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  const borderColorClass = isError ? 'border-danger' : variant === 'primary' ? 'border-primary' : 'border-neutral-20';
  const textColorClass = isError ? 'text-danger' : 'text-neutral-100';
  const disabledClass = isDisabled ? 'bg-neutral-20' : '';
  const showCancelBtn = !isDisabled && value && String(value).length > 0 && onClear;

  return (
    <div
      className={`flex h-12 w-full min-w-0 items-center justify-between gap-[10px] rounded border bg-neutral-0 px-3 ${borderColorClass} ${disabledClass} ${margin}`}
    >
      <input
        ref={ref}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`body1 min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-40 disabled:text-neutral-40 ${textColorClass}`}
      />
      {showCancelBtn && (
        <button type="button" onClick={onClear} className="flex items-center justify-center p-0.5" aria-label="clear">
          <Cancel className="size-6" />
        </button>
      )}
    </div>
  );
});
