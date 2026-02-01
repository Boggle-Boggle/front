import React from 'react';

type IconButtonProps = {
  label: string;
  align?: 'left' | 'right' | 'center';

  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ label, align = 'center', onClick }: IconButtonProps) => {
  const alignClass = `${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`;

  return (
    <button className={`flex size-12 items-center ${alignClass}`} type="button" aria-label={label} onClick={onClick}>
      {/* <Icon className="size-icon-md" /> */}
    </button>
  );
};

export default IconButton;
