import { ElementType, MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  form?: string;
  type?: 'submit' | 'button';
  width?: 'long' | 'short';
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey' | 'primaryLine' | 'warning';
  className?: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
};

export type TextButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
  size?: 'lg' | 'md' | 'sm';
  variant?: 'default' | 'primaryLine' | 'filled';
  className?: string;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
};
