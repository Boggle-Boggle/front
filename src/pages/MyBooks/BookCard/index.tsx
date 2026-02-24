import { MyBook } from '../types';

type BookCardProps = {
  book: MyBook;
};

const STATUS_BADGE_LABEL: Record<string, string> = {
  읽는중: '읽는중',
  중단: '중단',
};

const getReadCountLabel = (readCount: number) => `${readCount}회독`;

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalf ? '★' : '') + '☆'.repeat(emptyStars);
};

export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  const isReading = book.readingStatus === '읽는중';
  const isStopped = book.readingStatus === '중단';
  const badgeLabel =
    isReading || isStopped ? STATUS_BADGE_LABEL[book.readingStatus] : getReadCountLabel(book.readCount);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded">
        <img src={book.cover} alt={book.title} className="size-full object-cover" loading="lazy" />
        <span className="absolute bottom-2 left-2 rounded-full bg-neutral-80/80 px-2 py-0.5 text-[10px] font-medium text-neutral-0">
          {badgeLabel}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {isReading ? (
          <div className="flex items-center gap-1.5">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-20">
              <div className="h-full rounded-full bg-neutral-100" style={{ width: `${book.progress}%` }} />
            </div>
            <span className="shrink-0 text-[10px] text-neutral-60">{book.progress}%</span>
          </div>
        ) : (
          <span className="text-[10px] text-[#FFAA00]">{renderStars(book.rating)}</span>
        )}

        <p className="line-clamp-2 text-caption1 text-neutral-100">{book.title}</p>
      </div>
    </div>
  );
};
