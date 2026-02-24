import { TextButtonProps } from './type';

export const TextButton = (props: TextButtonProps) => {
  const {
    onClick,
    children,
    disabled = false,
    size = 'lg',
    variant = 'default',
    className = '',
    icon: Icon,
    iconPosition = 'left',
  } = props;

  const hasIcon = Boolean(Icon);
  const hasBgVariant = variant === 'bg' || variant === 'primaryLine';

  const baseClass = 'inline-flex items-center justify-center';

  const fontClass = size === 'lg' ? 'text-title4' : size === 'md' ? 'text-body2' : 'text-caption1';

  const gapClass = hasIcon ? (size === 'lg' ? 'gap-1' : 'gap-[3px]') : size === 'sm' ? 'gap-0.5' : 'gap-2.5';

  const paddingClass =
    size === 'lg'
      ? hasIcon
        ? hasBgVariant
          ? 'py-1 px-2'
          : 'py-1'
        : 'py-1 px-3'
      : size === 'md'
        ? hasIcon
          ? hasBgVariant
            ? 'py-[3px] px-1.5'
            : 'py-0.5'
          : variant === 'default'
            ? 'py-0.5 px-1'
            : 'py-0.5 px-2.5'
        : hasIcon
          ? hasBgVariant
            ? 'py-0.5 px-1.5'
            : 'py-0.5'
          : variant === 'default'
            ? 'py-0.5 px-1'
            : 'py-0.5 px-2.5';

  const shapeClass = variant !== 'default' || size === 'sm' ? 'rounded-full' : '';

  const variantClass = disabled
    ? variant === 'primaryLine'
      ? 'bg-neutral-0 border border-neutral-20 text-neutral-40'
      : variant === 'bg'
        ? 'bg-neutral-20 text-neutral-40'
        : size === 'sm'
          ? 'bg-neutral-20 text-neutral-40'
          : 'text-neutral-40'
    : variant === 'primaryLine'
      ? 'bg-neutral-0 border-[1.5px] border-primary text-primary'
      : variant === 'bg'
        ? 'bg-neutral-0 border border-neutral-20 text-neutral-100'
        : size === 'sm'
          ? 'bg-neutral-20 text-neutral-100'
          : 'text-neutral-100';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${fontClass} ${gapClass} ${paddingClass} ${shapeClass} ${variantClass} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="size-icon-sm" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="size-icon-sm" />}
    </button>
  );
};
