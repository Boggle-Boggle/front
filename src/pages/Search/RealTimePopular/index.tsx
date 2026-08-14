import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { Divider } from 'components/Divider';
import { Header } from 'components/Header';
import Highlight from 'components/Highlight';

import { useRealTimePopularBooksQuery } from './useRealTimePopularBooksQuery';

const MSG_SEARCH_REALTIME_POPULAR_TITLE = '실시간 인기 도서';
const MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL = '{rank}위';
const MSG_SEARCH_LOADING = '로딩중';

const RealTimePopular = () => {
  const { data, isLoading } = useRealTimePopularBooksQuery();
  const getRankLabel = (rank: number) => MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL.replace('{rank}', String(rank));

  const books = data?.items ?? [];

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={MSG_SEARCH_REALTIME_POPULAR_TITLE} withBack />

      {/* TODO: 추후 스켈레톤 UI로 대체 예정 */}
      {isLoading && <div className="py-4 text-center text-caption1 text-neutral-50">{MSG_SEARCH_LOADING}</div>}

      <ul className="flex-1 overflow-y-auto px-mobile">
        {!isLoading &&
          books.map((book, index) => (
            <Fragment key={book.isbn13}>
              <li className="flex items-center py-5">
                <Link to={`/books/${book.isbn13}`} className="flex w-full items-center">
                  {book.rank <= 3 ? (
                    <Highlight text={getRankLabel(book.rank)} className="w-10 shrink-0 text-center text-body2" />
                  ) : (
                    <p className="w-10 shrink-0 text-center text-body2">{getRankLabel(book.rank)}</p>
                  )}
                  <BookCover className="mx-[0.625rem] w-20 shrink-0" url={book.coverUrl} variant="clear" rounded="sm" />
                  <div className="flex min-w-0 flex-col justify-center gap-1">
                    <p className="line-clamp-1 text-title3">{book.title}</p>
                    <p className="line-clamp-1 text-caption1 text-neutral-60">{book.author}</p>
                  </div>
                </Link>
              </li>
              {index < books.length - 1 && <Divider />}
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default RealTimePopular;
