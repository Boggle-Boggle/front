type BookCoverProps = {
  size: 'mini' | 'small' | 'medium' | 'large';
  label?: string;
  hasShadow?: boolean;
};

export function BookCover({ size, label }: BookCoverProps) {
  const sizeClasses = {
    mini: 'w-[2.5rem] h-[3.5rem] rounded-[4px]',
    small: 'w-[5rem] h-[6.9375rem] rounded-[4px]',
    medium: 'w-[6.25rem] h-[8.75rem] rounded-[6px]',
    large: 'w-[6.8125rem] h-[9.5rem] rounded-[6px]',
  };

  return (
    <img className={sizeClasses[size]} src="https://image.aladin.co.kr/product/38515/3/cover500/e202637227_1.jpg" />
  );
}

export default BookCover;
