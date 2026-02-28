type BookCoverProps = {
  url: string;
  label?: string;
  ratio?: number;
  rounded?: 'sm' | 'lg';
  shadowLeftBar?: boolean;
  className?: string;
};

export const BookCover = (props: BookCoverProps) => {
  const { url, label = '', shadowLeftBar, ratio = 3 / 4, className = '', rounded = 'lg' } = props;
  const roundedClass = rounded === 'sm' ? 'rounded' : 'rounded-md';

  return (
    <div
      className={`relative inline-block overflow-hidden border border-neutral-20 ${roundedClass} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img className="relative z-20 size-full object-cover" src={url} alt={label} />
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
