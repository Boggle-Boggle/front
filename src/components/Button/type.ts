import { ElementType, MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  form?: string;
  type?: 'submit' | 'button';
  width?: 'long' | 'short';
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey' | 'primaryLine' | 'warning';
  className?: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
};
