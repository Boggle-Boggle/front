import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from 'pages/Loading';

import useDevice from 'hooks/useDevice';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getSearchBooks } from 'services/search';

import NoResultItems from './NoResultItems';
import SearchBookResult from './SearchBookResult';

type SearchResultProps = {
  query: string;
};

const SearchResult = ({ query }: SearchResultProps) => {
  const navigate = useNavigate();
  const { isIOS } = useDevice();

  const { data, refetch, observerTarget, isLoading, isFetchingNextPage } = useInfiniteScroll(
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
    <ul
      className={`${isIOS ? 'height-contentIOS' : 'height-contentAnd'} bottom-0 mt-3 h-full w-full overflow-y-auto rounded-tl-3xl bg-white px-5 pb-footerAnd pt-4`}
    >
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

      {isFetchingNextPage && (
        <div className="flex justify-center py-3">
          <Loading />
        </div>
      )}
    </ul>
  ) : (
    <NoResultItems />
  );
};

export default SearchResult;
