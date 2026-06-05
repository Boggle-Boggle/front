import { ReactNode } from 'react';

import { Badge } from 'components/Badge';

type ReadingStatusBadge = 'reading' | 'read' | 'stopped';

type BookCoverProps = {
  url: string;
  label?: string;
  ratio?: number;
  rounded?: 'sm' | 'lg';
  isAdult?: boolean;
  readingStatusBadge?: ReadingStatusBadge;
  shadowLeftBar?: boolean;
  shadowRightTriangle?: boolean;
  overlayBottomRight?: ReactNode;
  className?: string;
};

const MSG_BOOK_COVER_BADGE_READING = '읽는중';
const MSG_BOOK_COVER_BADGE_READ = '읽음';
const MSG_BOOK_COVER_BADGE_STOPPED = '중단';

const getReadingStatusBadgeLabel = (badge: ReadingStatusBadge) => {
  if (badge === 'reading') return MSG_BOOK_COVER_BADGE_READING;
  if (badge === 'read') return MSG_BOOK_COVER_BADGE_READ;

  return MSG_BOOK_COVER_BADGE_STOPPED;
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
    isAdult = false,
    readingStatusBadge,
    shadowLeftBar = false,
    shadowRightTriangle = false,
    overlayBottomRight,
    ratio = 3 / 4,
    className = '',
    rounded = 'lg',
  } = props;
  const roundedClass = rounded === 'sm' ? 'rounded' : 'rounded-md';

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative w-full overflow-hidden ring-1 ring-neutral-20 ${roundedClass}`}
        style={{ aspectRatio: ratio }}
      >
        <img className="absolute inset-0 z-bookShadow h-full w-full object-cover" src={url} alt={label} />
        {shadowLeftBar && <ShadowLeftBar />}
        {overlayBottomRight && <div className="absolute bottom-0 right-0 z-badge">{overlayBottomRight}</div>}
        {isAdult && <div className="absolute right-1 top-1 z-badge">19</div>}
        {readingStatusBadge && (
          <div className="absolute bottom-1 right-1 z-badge">
            <Badge text={getReadingStatusBadgeLabel(readingStatusBadge)} variant="gray" />
          </div>
        )}
      </div>
      {shadowRightTriangle && <ShadowRightTriangleSvg />}
    </div>
  );
};

export default BookCover;
