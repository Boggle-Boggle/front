/* eslint-disable react/button-has-type */

import { MouseEvent } from 'react';

import { ButtonProps } from './type';

const Button = ({
  onClick,
  children,
  disabled = false,
  loading = false,
  form,
  type = 'button',
  width = 'long',
  size = 'medium',
  variant = 'primary',
  className = '',
  icon: Icon,
  iconPosition = 'left',
}: ButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-1';
  const disabledClass = 'bg-neutral-0 text-neutral-40 border-neutral-20';
  const widthClass = width === 'long' ? 'w-full ' : 'w-fit';
  const borderClass = size === 'small' ? 'border-[1.5px]' : 'border';
  const sizeClass =
    size === 'small'
      ? 'h-[2.625rem] rounded-lg px-5 py-[0.625rem] text-title3 font-bold'
      : `h-[3.375rem] rounded-xl py-4 text-body1 ${width === 'long' ? 'px-3' : 'px-5'}`;
  const variantClass =
    variant === 'primary'
      ? 'bg-primary text-neutral-0 border-primary'
      : variant === 'grey'
        ? 'bg-neutral-0 text-neutral-100 border-neutral-20'
        : variant === 'primaryLine'
          ? 'bg-neutral-0 text-primary border-primary'
          : 'bg-danger text-neutral-0 border-danger';
  const iconSizeClass = size === 'small' ? 'size-icon-sm' : 'size-icon-md';
  const isInactive = disabled || loading;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (type === 'submit') e.preventDefault();

    if (isInactive) return;

    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isInactive}
      type={type}
      className={`relative ${base} ${sizeClass} ${widthClass} ${borderClass} ${disabled ? disabledClass : variantClass} ${className}`}
      form={form}
      aria-busy={loading}
    >
      <span className={`${base} ${loading ? 'invisible' : ''}`}>
        {Icon && iconPosition === 'left' && <Icon className={iconSizeClass} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className={iconSizeClass} />}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      )}
    </button>
  );
};

export default Button;
