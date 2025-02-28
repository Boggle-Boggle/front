import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  width?: string;
  background: 'accent' | 'blue' | 'red';
  textColor?: 
};

// review : handleClick, className에 다른 스타일이 들어오면 기대값을 충족하지 못함
// 따라서 확실히 변화하는 스타일만 props로 받는것이 낫다.
// string 타입으로 받으면 모든 스타일을 받을 수 있는데 컴포넌트에 어느정도 제한을 둬서 정해진 벨류값만 받을 수 있도록 유니온 타입으로 타입 지정
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  width = 'full',
  background = 'accent',
  color = 'white',
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      className={`flex h-[3.25rem] items-center justify-center rounded-lg drop-shadow w-${width} bg-${background} text-${color} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      // review: onClick으로 변경
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
