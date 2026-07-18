import { ElementType, MouseEventHandler } from 'react';

type IconButtonProps = {
  label: string;
  align?: 'left' | 'right' | 'center';
  icon?: ElementType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size?: 'xxs' | 'xs' | 'sm' | 'md';
  className?: string;
};

const IconButton = (props: IconButtonProps) => {
  const { label, align = 'center', icon: Icon, onClick, size = 'md', className } = props;

  const alignClass = `${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`;
  const sizeClass = size === 'xxs' ? 'size-4' : size === 'xs' ? 'size-6' : size === 'sm' ? 'size-9' : 'size-12';
  const iconSizeClass = size === 'xxs' ? 'size-3.5' : size === 'xs' || size === 'md' ? 'size-icon-md' : 'size-icon-sm';

  return (
    <button
      className={`flex items-center ${alignClass} ${sizeClass} ${className}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {Icon && <Icon className={iconSizeClass} />}
    </button>
  );
};

export default IconButton;
