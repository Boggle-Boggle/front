type BookCoverProps = {
  url: string;
  label?: string;
  ratio?: number;
  rounded?: 'sm' | 'lg';
  shadowLeftBar?: boolean;
  shadowRightTriangle?: boolean;
  className?: string;
};

const ShadowLeftBar = () => (
  <span
    className="z-bookShadow pointer-events-none absolute left-0 top-0 h-full w-[9px] mix-blend-multiply"
    style={{ background: 'linear-gradient(90deg, #FFFFFF 65%, #E0E0E0 100%)' }}
  />
);

const ShadowRightTriangleSvg = () => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-bookShadow pointer-events-none absolute -right-[11px] bottom-0 w-4"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g opacity="0.6" style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M4.65332 17.2529C3.65271 18.8944 1.90719 19.9246 0 20.0225C1.99315 19.888 3.56836 18.2304 3.56836 16.2031V0H15.1689L4.65332 17.2529Z"
          fill="url(#book-cover-shadow-right)"
        />
      </g>
      <defs>
        <linearGradient
          id="book-cover-shadow-right"
          x1="9.08767"
          y1="0"
          x2="9.08767"
          y2="20.0313"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEEEEE" />
          <stop offset="1" stopColor="#888888" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const BookCover = (props: BookCoverProps) => {
  const {
    url,
    label = '',
    shadowLeftBar = false,
    shadowRightTriangle = true,
    ratio = 3 / 4,
    className = '',
    rounded = 'lg',
  } = props;
  const roundedClass = rounded === 'sm' ? 'rounded' : 'rounded-md';

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative w-full overflow-hidden border border-neutral-20 ${roundedClass}`}
        style={{ aspectRatio: ratio }}
      >
        <img className="z-bookShadow absolute inset-0 h-full w-full object-cover" src={url} alt={label} />
        {shadowLeftBar && <ShadowLeftBar />}
      </div>
      {shadowRightTriangle && <ShadowRightTriangleSvg />}
    </div>
  );
};

export default BookCover;
