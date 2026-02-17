import { ElementType, MouseEventHandler } from 'react';

type IconButtonProps = {
  label: string;
  align?: 'left' | 'right' | 'center';
  icon?: ElementType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size?: 'sm' | 'md';
};

const IconButton = (props: IconButtonProps) => {
  const { label, align = 'center', icon: Icon, onClick, size = 'md' } = props;

  const alignClass = `${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`;
  const sizeClass = size === 'sm' ? 'size-9' : 'size-12';
  const iconSizeClass = size === 'sm' ? 'size-icon-sm' : 'size-icon-md';

  return (
    <button
      className={`flex items-center ${alignClass} ${sizeClass}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {Icon && <Icon className={iconSizeClass} />}
    </button>
  );
};

export default IconButton;
