import BookCover from 'components/BookCover';
import { ShelfBase } from 'components/ShelfBase';
import { StarRating } from 'components/StarRating';
import { MyBook } from 'pages/MyBooks/useMyBooksQuery';

type ReadingBooksListProps = {
  books: MyBook[];
};

const MSG_MYBOOKS_BOOK_STATUS_READING = '읽는중';
const MSG_MYBOOKS_BOOK_STATUS_READ = '읽음';
const MSG_MYBOOKS_BOOK_STATUS_STOPPED = '중단';
const MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER = '작가명을 입력해주세요';
const MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER = '00.00.00 ~ 00.00.00';

export const ReadingBooksList = (props: ReadingBooksListProps) => {
  const { books } = props;

  return (
    <ul className="flex flex-col pb-6">
      {books.map((book) => {
        const { id, cover, title, isAdult, readingStatus, rating } = book;
        const isReading = readingStatus === MSG_MYBOOKS_BOOK_STATUS_READING;
        const isRead = readingStatus === MSG_MYBOOKS_BOOK_STATUS_READ;
        const isStopped = readingStatus === MSG_MYBOOKS_BOOK_STATUS_STOPPED;
        const readingStatusBadge = isReading ? 'reading' : isRead ? 'read' : isStopped ? 'stopped' : undefined;

        return (
          <li key={id} className="relative flex items-center justify-start pb-11">
            <BookCover
              className="ml-mobile w-20 shrink-0"
              url={cover}
              label={title}
              rounded="sm"
              isAdult={isAdult}
              shadowLeftBar
              shadowRightTriangle
              readingStatusBadge={readingStatusBadge}
            />
            <div className="z-book min-w-0 pl-5 pr-mobile">
              <p className="line-clamp-2 text-title3">{title}</p>
              <p className="line-clamp-1 pb-0.5 text-caption1 text-neutral-80">{MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER}</p>
              <StarRating value={rating} size={14} className="text-[#FFAA00]" />
              <p className="text-caption1 text-neutral-40">{MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER}</p>
            </div>
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
