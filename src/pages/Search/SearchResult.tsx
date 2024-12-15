import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from 'pages/Loading';

import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getSearchBooks } from 'services/search';

import NoResultItems from './NoResultItems';
import SearchBookResult from './SearchBookResult';

type SearchResultProps = {
  query: string;
};

const SearchResult = ({ query }: SearchResultProps) => {
  const navigate = useNavigate();
  const { data, refetch, observerTarget, isLoading } = useInfiniteScroll(
    ['searchBooks', query],
    ({ pageParam = 1 }) => getSearchBooks(query, pageParam as number),
    false,
  );

  const handleGoDetail = (isbn: string) => {
    navigate(`/detail/${isbn}`);
  };

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  if (isLoading) return <Loading />;

  const allBooks = data?.pages.flatMap((page) => page.items) || [];

  return allBooks.length ? (
    <ul className="height-content bottom-0 h-full w-full overflow-y-auto rounded-tl-3xl bg-white p-6">
      {allBooks.map((book) => (
        <li key={book.isbn}>
          <button
            onClick={() => handleGoDetail(book.isbn)}
            type="button"
            aria-label={book.title}
            className="w-full text-start"
          >
            <SearchBookResult book={book} />
            <hr className="h-[2px] border-none bg-main" />
          </button>
        </li>
      ))}
      <div ref={observerTarget} className="h-7" />
    </ul>
  ) : (
    <NoResultItems />
  );
};

export default SearchResult;
