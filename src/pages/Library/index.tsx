import { useQuery } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';

import Header from 'components/Header';
import Icon from 'components/Icon';
import SearchBar from 'components/SearchBar';
import Loading from 'pages/Loading';

import useDevice from 'hooks/useDevice';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getLibraries, getLibraryBooks } from 'services/library';
import searchDebounce from 'utils/debounce';

import { CustomLibrary, StatusLibrary } from 'types/library';

import { CommonDown, CommonUp, LibraryCover, LibraryList, LibrarySort } from 'assets/icons';

import GridLayout from './GridLayout';
import LibraryEditedModal from './LibraryEditedModal';
import LibrarySelectModal from './LibrarySelectModal';
import LibrarySortModal from './LibrarySortModal';
import ListLayout from './ListLayout';

const Library = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('전체보기');

  const [isToggledLibrarySelect, setIsToggledLibrarySelect] = useState<boolean>(false);
  const [isToggledLibraryEdit, setIsToggledLibraryEdit] = useState<boolean>(false);
  const [isToggledSort, setIsToggledSort] = useState<boolean>(false);

  const { isIOS } = useDevice();

  const [selectedLibrary, setSelectedLibrary] = useState<CustomLibrary | StatusLibrary>({
    status: 'all',
    libraryName: '전체보기',
    bookCount: 0,
  });

  // 서재 가져오는 쿼리
  const {
    data: libraries,
    refetch: refetchLibraries,
    isLoading: isLibrariesLoading,
  } = useQuery({
    queryKey: ['libraries'],
    queryFn: () => getLibraries(),
  });

  // 선택된 서재에 따라 책 데이터 가져오는 쿼리
  const {
    data,
    refetch: refetchBooks,
    observerTarget,
    isLoading,
  } = useInfiniteScroll(
    ['libraryBooks', selectedLibrary],
    ({ pageParam = 1 }) => {
      if (selectedLibrary) setTitle(selectedLibrary.libraryName);

      if ('libraryId' in selectedLibrary)
        return getLibraryBooks({ libraryId: selectedLibrary.libraryId, keyword: value }, pageParam);

      return getLibraryBooks({ status: selectedLibrary.status, keyword: value }, pageParam);
    },
    false,
  );

  // 서치바 디바운싱
  const debouncedSearch = useRef(
    searchDebounce(() => {
      refetchBooks();
    }, 300),
  ).current;

  // 서재가 선택되고, 선택된 서재의 책을 가져왔을 때 개수를 동기화
  useEffect(() => {
    if (libraries) {
      const updatedLibrary =
        'libraryId' in selectedLibrary
          ? libraries.libraryList.find((lib) => lib.libraryId === selectedLibrary?.libraryId)
          : libraries.statusList.find((lib) => lib.status === selectedLibrary?.status);

      if (updatedLibrary && updatedLibrary.bookCount !== selectedLibrary.bookCount) {
        setSelectedLibrary((prev) => ({
          ...prev,
          bookCount: updatedLibrary.bookCount,
        }));
      }
    }
  }, [libraries, selectedLibrary]);

  // 서재가 선택될때마다 선택된 서재의 책을 가져옴
  useEffect(() => {
    refetchBooks();
  }, [refetchBooks, selectedLibrary]);

  const allBooks = data?.pages.flatMap((page) => page.items) || [];

  if (isLibrariesLoading || isLoading) return <Loading />;

  return (
    <>
      <Header
        backgroundColor="bg-main"
        rightBtn={
          <div className="flex">
            {layout === 'list' && (
              <button onClick={() => setLayout('grid')} type="button" aria-label="그리드 레이아웃으로 전환">
                <Icon Component={LibraryCover} />
              </button>
            )}
            {layout === 'grid' && (
              <button onClick={() => setLayout('list')} type="button" aria-label="리스트 레이아웃으로 전환">
                <Icon Component={LibraryList} />
              </button>
            )}
            <span className="w-2" />
            <button onClick={() => setIsToggledSort(true)} type="button" aria-label="정렬하기">
              <Icon Component={LibrarySort} />
            </button>
          </div>
        }
        title={
          <button
            onClick={() => setIsToggledLibrarySelect(true)}
            type="button"
            className={`inline-flex items-center justify-center ${title.length > 13 && 'text-sm'}`}
          >
            {`${title}(${data?.pages[0]?.totalResultCnt ?? 0})`}
            {isToggledLibrarySelect ? (
              <Icon Component={CommonDown} size="xs" style={{ marginLeft: '4px' }} />
            ) : (
              <Icon Component={CommonUp} size="xs" style={{ marginLeft: '4px' }} />
            )}
          </button>
        }
      />
      <div
        className={`${isIOS ? 'mt-[5.9rem]' : 'mt-[3.9rem]'} fixed z-20 w-full max-w-screen-sm bg-main pb-4 pt-[1px]`}
      >
        <SearchBar
          placeholder="서재 안 도서 검색"
          value={value}
          setValue={setValue}
          fetchResult={debouncedSearch}
          allowEmptyVal
        />
      </div>
      {data && (
        <section className={` ${isIOS ? 'mt-[8.25rem]' : 'mt-[7rem]'} mt-9 overflow-y-scroll pb-20`}>
          {layout === 'grid' && <GridLayout allBooks={allBooks} />}

          {layout === 'list' && (
            <section className="px-4">
              <ListLayout allBooks={allBooks} />
            </section>
          )}

          <div className="h-2" ref={observerTarget} />
        </section>
      )}

      {isToggledLibrarySelect && libraries && (
        <LibrarySelectModal
          onClose={setIsToggledLibrarySelect}
          handleEdit={() => setIsToggledLibraryEdit(true)}
          libraries={libraries}
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
        />
      )}
      {isToggledLibraryEdit && libraries && (
        <LibraryEditedModal
          onClose={setIsToggledLibraryEdit}
          handleOpenSelect={() => setIsToggledLibrarySelect(true)}
          libraries={libraries}
          refetchLibraries={refetchLibraries}
          setSelectedLibrary={setSelectedLibrary}
        />
      )}
      {isToggledSort && <LibrarySortModal onClose={setIsToggledSort} refetchBooks={refetchBooks} />}
    </>
  );
};

export default Library;
