import { useInfiniteQuery } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';
import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import SearchHistory from 'components/feat/SearchHistory';
import Header from 'components/ui/Header';
import SearchBar from 'components/ui/SearchBar';
import SearchBookResult from 'layouts/Search/SearchBookResult';

import getSearchBooks from 'services/search';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const [searchQueryEnabled, setSearchQueryEnabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['searchBooks', value],
    queryFn: ({ pageParam = 1 }) => getSearchBooks(value, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNum < Math.ceil(lastPage.totalResultCnt / lastPage.itemsPerPage)) {
        return lastPage.pageNum + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: false,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReadBarcode = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getSearchBooks(value, 1);
    setSearchQueryEnabled(true);
    refetch();
  };

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const allBooks = data?.pages.flatMap((page) => page.items) || [];
  const hasBooks = allBooks.length > 0;

  return (
    <div className="relative h-screen bg-[#DCD7D6]">
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
              <li key={book.isbn}>
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
          <div className="flex flex-col items-center justify-center pt-28">
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
