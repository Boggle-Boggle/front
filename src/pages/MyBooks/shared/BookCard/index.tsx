import BookCover from 'components/BookCover';
import { StarRating } from 'components/StarRating';

import { MyBook } from '../../useMyBooksQuery';

type BookCardProps = {
  book: MyBook;
};

const MSG_MYBOOKS_BOOK_STATUS_READING = '읽는중';
const MSG_MYBOOKS_BOOK_STATUS_READ = '읽음';
const MSG_MYBOOKS_BOOK_STATUS_STOPPED = '중단';

export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  const isReading = book.readingStatus === MSG_MYBOOKS_BOOK_STATUS_READING;
  const isRead = book.readingStatus === MSG_MYBOOKS_BOOK_STATUS_READ;
  const isStopped = book.readingStatus === MSG_MYBOOKS_BOOK_STATUS_STOPPED;
  const readingStatusBadge = isReading ? 'reading' : isRead ? 'read' : isStopped ? 'stopped' : undefined;

  return (
    <div className="flex flex-col gap-4">
      <BookCover
        url={book.cover}
        label={book.title}
        rounded="sm"
        isAdult={book.isAdult}
        shadowLeftBar
        shadowRightTriangle
        readingStatusBadge={readingStatusBadge}
      />

      <div className="flex flex-col gap-0.5">
        {isReading && (
          <div className="flex h-3.5 items-center gap-1.5">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-20">
              <div className="h-full rounded-full bg-neutral-100" style={{ width: `${book.progress}%` }} />
            </div>
            <span className="shrink-0 text-[10px] text-neutral-60">{book.progress}%</span>
          </div>
        )}
        {isStopped && (
          <div className="flex h-3.5 items-center">
            <StarRating value={book.rating} size={10.5} className="text-[#FFAA00]" />
          </div>
        )}
        <p className="line-clamp-2 text-caption1">{book.title}</p>
      </div>
    </div>
  );
};
