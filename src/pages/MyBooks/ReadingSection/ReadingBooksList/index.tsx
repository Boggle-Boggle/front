import BookCover from 'components/BookCover';
import { ShelfBase } from 'components/ShelfBase';
import { StarRating } from 'components/StarRating';
import { MyBook } from 'pages/MyBooks/useMyBooksQuery';

type ReadingBooksListProps = {
  books: MyBook[];
};

const MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER = '작가명을 입력해주세요';
const MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER = '00.00.00 ~ 00.00.00';

export const ReadingBooksList = (props: ReadingBooksListProps) => {
  const { books } = props;

  return (
    <ul className="flex flex-col pb-6">
      {books.map((book) => (
        <li key={book.id} className="relative flex items-center justify-start pb-11">
          <BookCover
            className="ml-mobile w-20 shrink-0"
            url={book.cover}
            label={book.title}
            rounded="sm"
            shadowLeftBar
            shadowRightTriangle
          />
          <div className="z-book min-w-0 pl-5 pr-mobile">
            <p className="line-clamp-2 text-title3">{book.title}</p>
            <p className="line-clamp-1 pb-0.5 text-caption1 text-neutral-80">{MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER}</p>
            <StarRating value={book.rating} size={14} className="text-[#FFAA00]" />
            <p className="text-caption1 text-neutral-40">{MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER}</p>
          </div>
          <div className="absolute left-0 right-0 top-20">
            <ShelfBase />
            <ShelfBase />
          </div>
        </li>
      ))}
    </ul>
  );
};
