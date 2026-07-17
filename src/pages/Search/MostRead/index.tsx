import { Link } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { Header } from 'components/Header';

import { useMostReadBooksQuery } from './useMostReadBooksQuery';

const MSG_SEARCH_MOST_READ_TITLE = '가장 많이 읽힌 책';

const mostReadTitle = <span className="text-body1 font-medium text-neutral-80">{MSG_SEARCH_MOST_READ_TITLE}</span>;

const MostRead = () => {
  const { data, isLoading } = useMostReadBooksQuery();
  const books = data?.items ?? [];

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={mostReadTitle} withBack />

      {/* TODO: 추후 스켈레톤 UI로 대체 예정 */}
      {isLoading && (
        <div className="py-4 text-center text-caption1 text-neutral-50">로딩중</div>
      )}

      <div className="flex-1 overflow-y-auto px-mobile pb-6 pt-5">
        {!isLoading && (
          <ul className="grid grid-cols-3 gap-x-2 gap-y-9">
            {books.map((book) => (
              <li key={book.isbn13} className="w-full">
                <Link to={`/books/${book.isbn13}`} className="w-full">
                  <BookCover className="w-full" url={book.coverUrl} variant="clear" />
                  <p className="text-neutral-90 line-clamp-2 pt-2 text-title3">{book.title}</p>
                  <p className="line-clamp-1 text-caption1 text-neutral-40">{book.author}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MostRead;

