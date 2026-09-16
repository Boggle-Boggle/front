import { ChangeEvent, FocusEvent, useState } from 'react';

import { IconButton } from 'components/Button';
import { IconCancel } from 'components/icons';

type InputAppearance = 'box' | 'line';
type InputStyle = 'default' | 'primary';
type InputState = 'default' | 'error' | 'disabled';
type InputVariant = InputStyle | Exclude<InputState, 'default'>;

export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type InputFocusEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
  id?: string;
  appearance?: InputAppearance;
  variant?: InputVariant;
  style?: InputStyle;
  state?: InputState;
  multiline?: boolean;
  margin?: string;
  value: string | number;
  onChange: (e: InputChangeEvent) => void;
  onClear?: () => void;
  onFocus?: (e: InputFocusEvent) => void;
  onBlur?: (e: InputFocusEvent) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  rows?: number;
  clearButtonLabel?: string;
};

type TextareaFieldProps = Pick<
  InputProps,
  'value' | 'onChange' | 'onFocus' | 'onBlur' | 'name' | 'placeholder' | 'maxLength'
> & {
  disabled: boolean;
  rows: number;
  className: string;
};

const getInputStyle = (variant: InputProps['variant'], style: InputProps['style']): InputStyle => {
  if (style) return style;
  if (variant === 'primary') return 'primary';

  return 'default';
};

const getInputState = (variant: InputProps['variant'], state: InputProps['state']): InputState => {
  if (state) return state;
  if (variant === 'error' || variant === 'disabled') return variant;

  return 'default';
};

const TextareaField = (props: TextareaFieldProps) => {
  const { disabled, value, onChange, onFocus, onBlur, name, placeholder, maxLength, rows, className } = props;

  return (
    <textarea
      disabled={disabled}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows}
      className={className}
    />
  );
};

export const Input = (props: InputProps) => {
  const {
    id,
    appearance = 'box',
    variant = 'default',
    style,
    state,
    multiline = false,
    margin = '',
    value,
    onClear,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    name,
    placeholder,
    min,
    max,
    maxLength,
    rows,
    clearButtonLabel = 'clear',
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputStyle = getInputStyle(variant, style);
  const inputState = getInputState(variant, state);
  const isLine = appearance === 'line' && !multiline;
  const isError = inputState === 'error';
  const isDisabled = inputState === 'disabled';
  const isPrimary = inputStyle === 'primary';
  const isActive = isFocused && !isError && !isDisabled;

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isDisabled) setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const boxWrapperClassName = [
    'w-full min-w-0 rounded border',
    multiline ? 'min-h-[6.5rem]' : 'flex h-10 items-center justify-between gap-2.5 px-3 py-2',
    isDisabled ? 'border-transparent bg-neutral-20' : 'bg-neutral-0',
    !isDisabled && isError ? 'border-danger' : '',
    !isDisabled && !isError && isActive ? 'border-primary' : '',
    !isDisabled && !isError && !isActive && isPrimary ? 'border-primary' : '',
    !isDisabled && !isError && !isActive && !isPrimary ? 'border-neutral-20' : '',
    margin,
  ]
    .filter(Boolean)
    .join(' ');

  const lineWrapperClassName = [
    'flex h-10 w-full min-w-0 items-center justify-between gap-2 border-b bg-transparent',
    isDisabled ? 'border-neutral-20' : '',
    !isDisabled && isError ? 'border-danger' : '',
    !isDisabled && !isError && isActive ? 'border-primary' : '',
    !isDisabled && !isError && !isActive ? 'border-neutral-40' : '',
    margin,
  ]
    .filter(Boolean)
    .join(' ');

  const inputTextColorClass = [
    isError ? 'text-danger' : '',
    !isError && isDisabled ? 'text-neutral-40' : '',
    !isError && !isDisabled ? 'text-neutral-100' : '',
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

  const inputClassName = [
    'body1 min-w-0 bg-transparent outline-none disabled:text-neutral-40',
    multiline ? 'min-h-[6.5rem] w-full resize-none px-3 py-3' : 'flex-1',
    type === 'number'
      ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      : '',
    inputTextColorClass,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassName = isLine ? lineWrapperClassName : boxWrapperClassName;
  const showCancelBtn = !multiline && !isDisabled && value && String(value).length > 0 && onClear;

  if (multiline) {
    const resolvedRows = rows ?? 3;

    return (
      <div className={wrapperClassName}>
        <TextareaField
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={resolvedRows}
          className={inputClassName}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <input
        id={id}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max}
        maxLength={maxLength}
        className={inputClassName}
      />
      {showCancelBtn && (
        <IconButton
          label={clearButtonLabel}
          align="right"
          icon={IconCancel}
          onClick={onClear}
          size="sm"
          className={clearButtonColorClass}
        />
      )}
    </div>
  );
};
