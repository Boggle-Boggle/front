import BookCover from 'components/BookCover';
import { Header } from 'components/Header';

import { useTrendingBooksQuery } from './useTrendingBooksQuery';

const MSG_SEARCH_TRENDING_TITLE = '요즘 주목받고 있는 책';
const MSG_SEARCH_LOADING = '로딩중';

const trendingTitle = <span className="text-body1 font-medium text-neutral-80">{MSG_SEARCH_TRENDING_TITLE}</span>;

const Trending = () => {
  const { data, isLoading, isFetchingNextPage, observerTarget } = useTrendingBooksQuery();
  const books = data ? data.pages.flatMap((page) => page.items) : [];

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={trendingTitle} withBack />

      <div className="flex-1 overflow-y-auto px-mobile pb-6 pt-5">
        {(isLoading || isFetchingNextPage) && (
          <div className="py-4 text-center text-caption1 text-neutral-50">{MSG_SEARCH_LOADING}</div>
        )}

        {!isLoading && (
          <ul className="grid grid-cols-3 gap-x-2 gap-y-9">
            {books.map((book) => (
              <li key={book.id} className="w-full">
                <BookCover className="w-full" url={book.cover} variant="clear" />
                <p className="text-neutral-90 line-clamp-2 pt-2 text-title3">{book.title}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-40">{book.author}</p>
              </li>
            ))}
          </ul>
        )}

        <div ref={observerTarget} className="h-4 w-full" />
      </div>
    </div>
  );
};

export default Trending;
