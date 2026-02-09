type BookCoverProps = {
  size: 'mini' | 'small' | 'medium' | 'large';
  url: string;
  label?: string;
  shadowLeftBar?: boolean;
  // shadowBackTriangle?: boolean;
};

export const BookCover = ({ size, url, label = '', shadowLeftBar }: BookCoverProps) => {
  const sizeClasses = {
    mini: 'w-[2.5rem] h-[3.5rem] rounded-[4px]',
    small: 'w-[5rem] h-[6.9375rem] rounded-[4px]',
    medium: 'w-[6.25rem] h-[8.75rem] rounded-[6px]',
    large: 'w-[6.8125rem] h-[9.5rem] rounded-[6px]',
  };

  return (
    <div className="relative inline-block">
      <img className={`relative z-20 ${sizeClasses[size]}`} src={url} alt={label} />
      {shadowLeftBar && (
        <span
          className="pointer-events-none absolute left-0 top-0 z-30 h-full w-[9px] mix-blend-multiply"
          style={{ background: 'linear-gradient(90deg, #FFFFFF 65%, #E0E0E0 100%)' }}
        />
      )}
    </div>
  );
};

export default BookCover;
