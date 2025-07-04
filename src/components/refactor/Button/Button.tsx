/* eslint-disable react/button-has-type */

import { ButtonProps } from './type';

const Button = ({
  onClick,
  children,
  disabled = false,
  type = 'button',
  width = 'long',
  size = 'medium',
  variant = 'primary',
}: ButtonProps) => {
  const base = 'flex justify-center border-[1.5px] ';
  const disabledClass = 'bg-neutral-0 text-neutral-40 border-neutral-20';
  const widthClass = width === 'long' ? 'w-full' : 'w-fit';
  const sizeClass =
    size === 'small' ? 'rounded-lg py-[0.625rem] px-5 text-title3' : 'rounded-xl py-4 px-[1.625rem] text-body1';
  const variantClass =
    variant === 'primary'
      ? 'bg-primary text-neutral-0 border-primary'
      : variant === 'grey'
        ? 'bg-neutral-0 text-neutral-100 border-neutral-20'
        : variant === 'primaryLine'
          ? 'bg-neutral-0 text-primary border-primary'
          : 'bg-danger text-neutral-0 border-danger';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'submit') {
      e.preventDefault();
    }

    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={`${base} ${sizeClass} ${widthClass} ${disabled ? disabledClass : variantClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
