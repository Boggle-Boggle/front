import { forwardRef, ChangeEvent, FocusEvent, useState } from 'react';

import { IconCancel } from 'components/icons';

type InputStyle = 'default' | 'primary';
type InputState = 'default' | 'error' | 'disabled';
type InputVariant = InputStyle | Exclude<InputState, 'default'>;

type InputProps = {
  variant?: InputVariant;
  style?: InputStyle;
  state?: InputState;
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
};

const getInputStyle = (variant: InputVariant | undefined, style: InputStyle | undefined): InputStyle => {
  if (style) return style;
  if (variant === 'primary') return 'primary';

  return 'default';
};

const getInputState = (variant: InputVariant | undefined, state: InputState | undefined): InputState => {
  if (state) return state;
  if (variant === 'error' || variant === 'disabled') return variant;

  return 'default';
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant = 'default',
    style,
    state,
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
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputStyle = getInputStyle(variant, style);
  const inputState = getInputState(variant, state);
  const isError = inputState === 'error';
  const isDisabled = inputState === 'disabled';
  const isPrimary = inputStyle === 'primary';
  const isActive = isFocused && !isError && !isDisabled;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!isDisabled) setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const wrapperClassName = [
    'flex h-10 w-full min-w-0 items-center justify-between gap-2.5 rounded border px-3 py-2',
    isDisabled ? 'border-transparent bg-neutral-20' : 'bg-neutral-0',
    !isDisabled && isError ? 'border-danger' : '',
    !isDisabled && !isError && isPrimary ? 'border-primary' : '',
    !isDisabled && !isError && !isPrimary ? 'border-neutral-20' : '',
    margin,
  ]
    .filter(Boolean)
    .join(' ');

  const inputTextColorClass = [
    isError ? 'text-danger' : '',
    !isError && isDisabled ? 'text-neutral-40' : '',
    !isError && !isDisabled && isActive ? 'text-neutral-100' : '',
    !isError && !isDisabled && !isActive ? 'text-neutral-40' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputPlaceholderColorClass = [
    isError ? 'placeholder:text-danger' : '',
    !isError && isDisabled ? 'placeholder:text-neutral-40' : '',
    !isError && !isDisabled && isActive ? 'placeholder:text-neutral-100' : '',
    !isError && !isDisabled && !isActive ? 'placeholder:text-neutral-40' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const clearButtonColorClass = [
    isError ? 'text-neutral-100' : '',
    !isError && isDisabled ? 'text-neutral-40' : '',
    !isError && !isDisabled && isActive ? 'text-neutral-100' : '',
    !isError && !isDisabled && !isActive ? 'text-neutral-40' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const showCancelBtn = !isDisabled && value && String(value).length > 0 && onClear;

  return (
    <div className={wrapperClassName}>
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
        className={`body1 min-w-0 flex-1 bg-transparent outline-none disabled:text-neutral-40 ${inputTextColorClass} ${inputPlaceholderColorClass}`}
      />
      {showCancelBtn && (
        <button
          type="button"
          onClick={onClear}
          className={`flex size-6 items-center justify-center ${clearButtonColorClass}`}
          aria-label="clear"
        >
          <IconCancel className="size-4" />
        </button>
      )}
    </div>
  );
});
