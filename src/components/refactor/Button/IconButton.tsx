type IconButtonProps = {
  label: string;
  align?: 'left' | 'right' | 'center';
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ label, align = 'center', children, onClick }: IconButtonProps) => {
  const alignClass = `${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`;

  return (
    <button className={`flex size-12 items-center ${alignClass}`} type="button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
