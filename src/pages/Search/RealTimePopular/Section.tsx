import { Link, useNavigate } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { ScrollFadeOverlay } from 'components/ScrollFadeOverlay';

import { useRealTimePopularBooksQuery } from './useRealTimePopularBooksQuery';
import { Title } from '../shared/Title';

const MSG_SEARCH_REALTIME_POPULAR_TITLE = '실시간 인기 도서';
const MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL = '{rank}위';

export const RealTimePopularSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useRealTimePopularBooksQuery();

  const getRankLabel = (rank: number) => MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL.replace('{rank}', String(rank));

  const handleLoadMore = () => navigate('/search/realtime-popular');

  const books = data?.items ?? [];

  if (isLoading) return null;

  return (
    <>
      <Title text={MSG_SEARCH_REALTIME_POPULAR_TITLE} onLoadMore={handleLoadMore} />
      <section className="relative w-full pb-10">
        <ol className="scrollbar-hide grid grid-flow-col grid-rows-3 gap-x-10 gap-y-4 overflow-x-auto px-mobile">
          {books.map((book) => (
            <li key={book.isbn13} className="flex h-28 w-80 items-center">
              <Link to={`/books/${book.isbn13}`} className="flex w-full items-center">
                <span className="flex w-8 items-center justify-center text-title3">{getRankLabel(book.rank)}</span>
                <BookCover
                  className="mx-4 mr-[0.625rem] w-20 shrink-0"
                  url={book.coverUrl}
                  variant="clear"
                  rounded="sm"
                />
                <div className="min-w-0">
                  <p className="line-clamp-1 text-title3">{book.title}</p>
                  <p className="line-clamp-1 text-caption1 text-neutral-60">{book.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <ScrollFadeOverlay intensity="hard" className="w-[3.5rem]" />
      </section>
    </>
  );
};
