import React from 'react';

type ButtonProps = {
  handleClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ handleClick, children, className, disabled = false }) => {
  return (
    <button
      type="submit"
      className={`flex h-[3.25rem] items-center justify-center rounded-lg bg-accent drop-shadow ${className ?? 'w-full text-white'} ${
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
