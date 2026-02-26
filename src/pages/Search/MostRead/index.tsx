import BookCover from 'components/BookCover';
import { BackButton } from 'components/Header/BackButton';

import { useMostReadBooksQuery } from './useMostReadBooksQuery';

const MSG_SEARCH_MOST_READ_TITLE = '가장 많이 읽힌 책';
const MSG_SEARCH_MOST_READ_LOADING = '불러오는 중';

const MostRead = () => {
  const { data, isLoading, isFetchingNextPage, observerTarget } = useMostReadBooksQuery();
  const books = data ? data.pages.flatMap((page) => page.items) : [];

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      <div className="flex w-full items-center justify-between px-mobile py-3">
        <BackButton />
        <h1 className="text-neutral-90 text-body1 font-medium">{MSG_SEARCH_MOST_READ_TITLE}</h1>
        <div className="size-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-mobile pb-6">
        {isLoading && (
          <div className="py-4 text-center text-caption1 text-neutral-50">{MSG_SEARCH_MOST_READ_LOADING}</div>
        )}

        {!isLoading && (
          <ul className="grid grid-cols-2 gap-x-2 gap-y-6">
            {books.map((book) => (
              <li key={book.id} className="w-full">
                <BookCover size="medium" url={book.cover} />
                <p className="text-neutral-90 line-clamp-1 pt-2 text-title3">{book.title}</p>
                <p className="line-clamp-1 pt-1 text-caption1 text-neutral-40">{book.author}</p>
              </li>
            ))}
          </ul>
        )}

        {isFetchingNextPage && (
          <div className="py-4 text-center text-caption1 text-neutral-50">{MSG_SEARCH_MOST_READ_LOADING}</div>
        )}
        <div ref={observerTarget} className="h-4 w-full" />
      </div>
    </div>
  );
};

export default MostRead;
