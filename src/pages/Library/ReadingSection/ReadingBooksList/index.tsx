import { useNavigate } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { ShelfBase } from 'components/ShelfBase';
import { StarRating } from 'components/StarRating';
import { MyBook } from 'pages/Library/useLibraryQuery';

import { formatDateLabel } from 'utils/format';

type ReadingBooksListProps = {
  books: MyBook[];
};

const MSG_MYBOOKS_BOOK_STATUS_READING = '읽는중';
const MSG_MYBOOKS_BOOK_STATUS_READ = '읽음';
const MSG_MYBOOKS_BOOK_STATUS_STOPPED = '중단';

export const ReadingBooksList = (props: ReadingBooksListProps) => {
  const { books } = props;
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col pb-6">
      {books.map((book) => {
        const { id, cover, title, isAdult, readingStatus, rating, author, startDate, endDate } = book;
        const isReading = readingStatus === MSG_MYBOOKS_BOOK_STATUS_READING;
        const isRead = readingStatus === MSG_MYBOOKS_BOOK_STATUS_READ;
        const isStopped = readingStatus === MSG_MYBOOKS_BOOK_STATUS_STOPPED;
        const readingStatusBadge = isReading ? 'reading' : isRead ? 'read' : isStopped ? 'stopped' : undefined;

        const start = formatDateLabel(startDate);
        const end = formatDateLabel(endDate);
        const periodText = `${start} ~ ${end}`;

        const handleBookClick = () => navigate(`/records/${id}`);

        return (
          <li key={id} className="relative flex items-center justify-start pb-11">
            <button type="button" className="flex w-full items-center text-left" onClick={handleBookClick}>
              <BookCover
                className="ml-mobile w-20 shrink-0"
                url={cover}
                label={title}
                variant="mockup"
                rounded="sm"
                isAdult={isAdult}
                shadowRightTriangle
                readingStatusBadge={readingStatusBadge}
              />
              <div className="z-book min-w-0 pl-5 pr-mobile">
                <p className="line-clamp-2 text-title3">{title}</p>
                <p className="line-clamp-1 pb-0.5 text-caption1 text-neutral-80">{author}</p>
                <StarRating value={rating} size={14} />
                <p className="text-caption1 text-neutral-40">{periodText}</p>
              </div>
            </button>
            <div className="absolute left-0 right-0 top-20">
              <ShelfBase />
              <ShelfBase />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
