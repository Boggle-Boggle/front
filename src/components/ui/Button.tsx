import React from 'react';

type ButtonProps = {
  handleClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  width?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ handleClick, width, children, disabled = false }) => {
  return (
    <button
      type="submit"
      className={`bg-accent flex h-[50px] items-center justify-center rounded-lg text-white drop-shadow ${width ? `w-[${width}]` : 'w-full'} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
