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
      className={
        `flex h-[50px] items-center justify-center rounded-lg bg-accent text-white drop-shadow ${className ?? 'w-full'} ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }` + className
      }
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
