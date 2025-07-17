export type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  form?: string;
  type?: 'submit' | 'button';
  width?: 'long' | 'short';
  size?: 'small' | 'medium';
  variant?: 'primary' | 'grey' | 'primaryLine' | 'warning';
};
