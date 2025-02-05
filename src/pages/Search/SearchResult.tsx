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

  // 페이지네이션 적용
  const { data, refetch, observerTarget, isLoading } = useInfiniteScroll(
    ['searchBooks', query],
    ({ pageParam = 1 }) => getSearchBooks(query, pageParam as number),
    false,
  );

  // 검색 결과를 클릭했을 경우 해당 책의 상세조회페이지로 이동

  const handleGoDetail = (isbn: string) => {
    navigate(`/detail/${isbn}`);
  };

  // 현재 검색중인 쿼리가 변경되면 리로드
  useEffect(() => {
    if (query) refetch();
  }, [query, refetch]);

  if (isLoading) return <Loading />;

  // 모든 책을 플랫화 해서 보여줌
  const allBooks = data?.pages.flatMap((page) => page.items) || [];

  // 책이 있고 없고에 따라 다른 화면을 보여줌
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
            {/* 책이 있을 경우 */}
            <SearchBookResult book={book} />
            <hr className="h-[2px] border-none bg-main" />
          </button>
        </li>
      ))}
      <div ref={observerTarget} className="h-7" />
    </ul>
  ) : (
    // 책이 없을 경우
    <NoResultItems />
  );
};

export default SearchResult;
