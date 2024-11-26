import { useState } from 'react';
import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import SearchHistory from 'components/feat/SearchHistory';
import Header from 'components/ui/Header';
import SearchBar from 'components/ui/SearchBar';

import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getSearchBooks } from 'services/search';

import SearchBookResult from './SearchBookResult';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const [searchQueryEnabled, setSearchQueryEnabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, refetch, observerTarget, isFetchingNextPage } = useInfiniteScroll(
    ['searchBooks', value],
    ({ pageParam = 1 }) => getSearchBooks(value, pageParam as number),
    false,
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoDetail = (isbn: string) => {
    navigate(`/detail/${isbn}`);
  };

  const handleReadBarcode = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQueryEnabled(true);
    refetch();
  };

  const allBooks = data?.pages.flatMap((page) => page.items) || [];
  const hasBooks = allBooks.length > 0;

  if (isFetchingNextPage) {
    <div>로딩중</div>;
  }

  return (
    <div className="bg-mainLightGray relative h-screen">
      <Header
        title={{ text: '도서 검색' }}
        leftBtn={{
          icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick: handleGoBack,
        }}
        rightBtn={{
          icon: <BiScan style={{ width: '24px', height: '24px' }} />,
          handleRightBtnClick: handleReadBarcode,
        }}
      />
      <SearchBar
        placeholder="읽고 싶은 책을 검색해 보세요!"
        value={value}
        setValue={setValue}
        handleSubmit={(e) => handleSubmit(e)}
      />
      {/* eslint-disable-next-line no-nested-ternary */}
      {searchQueryEnabled ? (
        hasBooks ? (
          <ul className="height-content absolute bottom-0 mb-[80px] w-full overflow-y-auto rounded-tl-3xl bg-white p-6">
            {allBooks.map((book) => (
              <li key={book.isbn} onClick={() => handleGoDetail(book.isbn)}>
                <SearchBookResult book={book} />
                <hr />
              </li>
            ))}
            <div ref={observerTarget} />
          </ul>
        ) : (
          <div>아이템 없슴~!!</div>
        )
      ) : (
        <>
          <SearchHistory />
          <div className="flex flex-col items-center justify-center pt-28 text-sub">
            <TbCameraSearch style={{ width: '137px', height: '137px', opacity: '30%' }} />
            <p className="pt-4 text-center">
              오른쪽 상단의 아이콘을 클릭하면 <br />
              바코드 검색이 가능합니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
