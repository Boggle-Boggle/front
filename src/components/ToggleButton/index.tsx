import { ElementType, MouseEventHandler } from 'react';

type ToggleButtonBaseProps = {
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ElementType;
  selectedIcon?: ElementType;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

type ToggleButtonIconProps = ToggleButtonBaseProps & {
  variant: 'icon';
};

type ToggleButtonIconTextProps = ToggleButtonBaseProps & {
  variant: 'iconText';
  label: string;
};

type ToggleButtonIconCountProps = ToggleButtonBaseProps & {
  variant: 'iconCount';
  count: number | string;
};

export type ToggleButtonProps = ToggleButtonIconProps | ToggleButtonIconTextProps | ToggleButtonIconCountProps;

export const ToggleButton = (props: ToggleButtonProps) => {
  const { variant } = props;
  const transitionClass = 'transition-all duration-300 ease-out';

  const getBaseStateClass = (selected: boolean) => {
    return selected
      ? 'border border-neutral-20 bg-neutral-0'
      : 'border border-transparent bg-neutral-20';
  };

  if (variant === 'icon') {
    const { selected, onClick, icon: Icon, selectedIcon, disabled = false, className = '', ariaLabel } = props;
    const CurrentIcon = selected && selectedIcon ? selectedIcon : Icon;
    const disabledClass = disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer';
    const iconColorClass = selected ? 'text-primary' : 'text-neutral-60';
    const containerClass = `inline-flex h-8 w-8 items-center justify-center rounded-full ${getBaseStateClass(selected)}`;

    return (
      <button
        type="button"
        aria-pressed={selected}
        aria-label={ariaLabel ?? '토글 버튼'}
        onClick={onClick}
        disabled={disabled}
        className={`${containerClass} ${transitionClass} ${disabledClass} ${className}`}
      >
        <CurrentIcon className={`size-icon-md ${transitionClass} ${iconColorClass}`} />
      </button>
    );
  }

  if (variant === 'iconText') {
    const { selected, onClick, icon: Icon, selectedIcon, disabled = false, className = '', ariaLabel, label } = props;
    const CurrentIcon = selected && selectedIcon ? selectedIcon : Icon;
    const disabledClass = disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer';
    const iconColorClass = selected ? 'text-primary' : 'text-neutral-60';
    const containerClass = selected
      ? `inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ${getBaseStateClass(selected)}`
      : `inline-flex h-8 w-24 items-center justify-start gap-0.5 overflow-hidden rounded-full px-2 ${getBaseStateClass(selected)}`;
    const labelClass = selected
      ? 'w-0 opacity-0'
      : 'w-[3.5rem] translate-x-0 opacity-100 text-neutral-60';

    return (
      <button
        type="button"
        aria-pressed={selected}
        aria-label={ariaLabel ?? label}
        onClick={onClick}
        disabled={disabled}
        className={`${containerClass} ${transitionClass} ${disabledClass} ${className}`}
      >
        <CurrentIcon className={`size-icon-md shrink-0 ${transitionClass} ${iconColorClass}`} />
        <span
          className={`overflow-hidden whitespace-nowrap text-body2 font-bold ${transitionClass} ${labelClass}`}
        >
          {label}
        </span>
      </button>
    );
  }

  const { selected, onClick, icon: Icon, selectedIcon, disabled = false, className = '', ariaLabel, count } = props;
  const CurrentIcon = selected && selectedIcon ? selectedIcon : Icon;
  const disabledClass = disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer';
  const iconColorClass = selected ? 'text-primary' : 'text-neutral-60';
  const containerClass = `inline-flex h-8 items-center justify-center gap-0.5 rounded-full px-2 ${getBaseStateClass(selected)}`;
  const countColorClass = selected ? 'text-neutral-100' : 'text-neutral-60';

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel ?? `${count}`}
      onClick={onClick}
      disabled={disabled}
      className={`${containerClass} ${transitionClass} ${disabledClass} ${className}`}
    >
      <CurrentIcon className={`size-icon-md ${transitionClass} ${iconColorClass}`} />
      <span className={`text-body2 font-bold ${transitionClass} ${countColorClass}`}>{count}</span>
    </button>
  );
};
