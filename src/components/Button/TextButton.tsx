import { TextButtonProps } from './type';

export const TextButton = (props: TextButtonProps) => {
  const {
    onClick,
    text,
    disabled = false,
    size = 'lg',
    variant = 'default',
    className = '',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
  } = props;

  const hasIcon = Boolean(LeftIcon || RightIcon);

  const sizeClass =
    size === 'lg'
      ? hasIcon
        ? 'text-title4 py-1'
        : 'text-title4 py-1 px-3'
      : size === 'md'
        ? hasIcon
          ? 'h-7 text-body2'
          : 'h-7 text-body2 px-2'
        : hasIcon
          ? 'text-caption1 py-0.5'
          : 'text-caption1 py-0.5 px-1';

  const gapClass = hasIcon ? (size === 'lg' ? 'gap-1' : size === 'md' ? 'gap-0.5' : 'gap-[3px]') : '';

  const paddingByVariantClass =
    variant === 'default'
      ? ''
      : size === 'lg'
        ? hasIcon
          ? 'px-2'
          : 'px-3'
        : size === 'md'
          ? hasIcon
            ? 'px-2 py-1'
            : 'px-2 py-1'
          : hasIcon
            ? 'px-1.5'
            : 'px-2.5';

  const variantClass = disabled
    ? variant === 'default'
      ? 'text-neutral-40'
      : variant === 'line'
        ? 'bg-neutral-0 border border-neutral-20 text-neutral-40 rounded-full'
        : 'bg-neutral-20 text-neutral-40 rounded-full'
    : variant === 'default'
      ? 'text-neutral-100'
      : variant === 'line'
        ? 'bg-neutral-0 border-[1.5px] border-primary text-primary rounded-full'
        : 'bg-neutral-0 border border-neutral-20 text-neutral-100 rounded-full';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center ${sizeClass} ${gapClass} ${paddingByVariantClass} ${variantClass} ${className}`}
    >
      {LeftIcon && <LeftIcon className="size-icon-sm" />}
      <span>{text}</span>
      {RightIcon && <RightIcon className="size-icon-sm" />}
    </button>
  );
};
