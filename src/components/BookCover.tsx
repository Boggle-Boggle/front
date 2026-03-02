type BookCoverBadgeType = 'adult' | 'reading' | 'stopped' | 'readCount';

type BookCoverBadge = {
  type: BookCoverBadgeType;
  readCount?: number;
};

type BookCoverProps = {
  url: string;
  label?: string;
  ratio?: number;
  rounded?: 'sm' | 'lg';
  shadowLeftBar?: boolean;
  shadowRightTriangle?: boolean;
  topRightBadge?: BookCoverBadge;
  bottomRightBadge?: BookCoverBadge;
  className?: string;
};

const MSG_BOOK_COVER_BADGE_ADULT = '성인';
const MSG_BOOK_COVER_BADGE_READING = '읽는중';
const MSG_BOOK_COVER_BADGE_STOPPED = '중단';
const MSG_BOOK_COVER_BADGE_READ_COUNT = '회독';

const getBadgeLabel = (badge: BookCoverBadge) => {
  if (badge.type === 'adult') return MSG_BOOK_COVER_BADGE_ADULT;
  if (badge.type === 'reading') return MSG_BOOK_COVER_BADGE_READING;
  if (badge.type === 'stopped') return MSG_BOOK_COVER_BADGE_STOPPED;

  return `${badge.readCount ?? 0}${MSG_BOOK_COVER_BADGE_READ_COUNT}`;
};

const getBadgeClassName = (type: BookCoverBadgeType) => {
  if (type === 'adult') {
    return 'bg-[#FF4D4F]/90 text-white';
  }

  return 'bg-[#888888]/80 text-white';
};

const Badge = (props: { badge: BookCoverBadge }) => {
  const { badge } = props;
  const label = getBadgeLabel(badge);
  const badgeClassName = getBadgeClassName(badge.type);

  return (
    <span className={`text-caption3 inline-flex items-center rounded-full px-2 py-0.5 ${badgeClassName}`}>{label}</span>
  );
};

const ShadowLeftBar = () => (
  <span
    className="pointer-events-none absolute left-0 top-0 z-bookShadow h-full w-[9px] mix-blend-multiply"
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
      className="pointer-events-none absolute -right-[11px] bottom-0 z-bookShadow w-4"
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
    topRightBadge,
    bottomRightBadge,
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
        <img className="absolute inset-0 z-bookShadow h-full w-full object-cover" src={url} alt={label} />
        {shadowLeftBar && <ShadowLeftBar />}
        {topRightBadge && (
          <div className="z-bookText absolute right-1 top-1">
            <Badge badge={topRightBadge} />
          </div>
        )}
        {bottomRightBadge && (
          <div className="z-bookText absolute bottom-1 right-1">
            <Badge badge={bottomRightBadge} />
          </div>
        )}
      </div>
      {shadowRightTriangle && <ShadowRightTriangleSvg />}
    </div>
  );
};

export default BookCover;
