type IconButtonProps = {
  label: string;
  size?: 'small' | 'medium';
  align?: 'left' | 'right' | 'center';
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ label, size = 'medium', align = 'center', children, onClick }: IconButtonProps) => {
  const alignClass = `${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`;
  const sizeClass = size === 'small' ? 'size-10' : 'size-12';

  return (
    <button
      className={`flex items-center ${sizeClass} ${alignClass}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
