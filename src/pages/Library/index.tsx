import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { FiMoreVertical, FiGrid, FiList } from 'react-icons/fi';

import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import Loading from 'pages/Loading';

import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getLibraries, getLibraryBooks } from 'services/library';

import { CustomLibrary, StatusLibrary } from 'types/library';

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

  const [selectedLibrary, setSelectedLibrary] = useState<CustomLibrary | StatusLibrary>({
    status: 'all',
    libraryName: '전체보기',
    bookCount: 0,
  });

  const { data: libraries, refetch: refetchLibraries } = useQuery({
    queryKey: ['libraries'],
    queryFn: () => getLibraries(),
  });

  const {
    data,
    refetch: refetchBooks,
    observerTarget,
    isLoading,
  } = useInfiniteScroll(
    ['libraryBooks', selectedLibrary],
    ({ pageParam = 1 }) => {
      if (selectedLibrary) setTitle(selectedLibrary.libraryName);

      if ('libraryId' in selectedLibrary) return getLibraryBooks({ libraryId: selectedLibrary.libraryId }, pageParam);

      return getLibraryBooks({ status: selectedLibrary.status }, pageParam);
    },
    false,
  );

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

  useEffect(() => {
    refetchBooks();
  }, [refetchBooks, selectedLibrary]);

  const allBooks = data?.pages.flatMap((page) => page.items) || [];
  if (isLoading) <Loading />;

  return (
    <>
      <Header
        rightBtn={{
          icon: (
            <div className="flex">
              {layout === 'list' && (
                <FiGrid style={{ width: '24px', height: '24px' }} onClick={() => setLayout('grid')} />
              )}
              {layout === 'grid' && (
                <FiList style={{ width: '24px', height: '24px' }} onClick={() => setLayout('list')} />
              )}
              <span className="w-2" />
              <FiMoreVertical style={{ width: '24px', height: '24px' }} onClick={() => setIsToggledSort(true)} />
            </div>
          ),
          handleRightBtnClick: () => {},
        }}
        title={{
          text: `${title}(${selectedLibrary.bookCount})`,
          handleTitleClick: () => setIsToggledLibrarySelect(true),
        }}
      />
      <SearchBar
        placeholder="서재 안 도서 검색"
        value={value}
        setValue={setValue}
        fetchResult={() => {
          // console.log('데이터 가져올예정');
        }}
      />
      {data && (
        <>
          {layout === 'list' && (
            <section className="height-content mt-4 overflow-y-scroll bg-main pb-8">
              <ListLayout allBooks={allBooks} />
            </section>
          )}
          {layout === 'grid' && (
            <section className="mt-3 h-[calc(100%_-_9.75rem_-_36px)] overflow-y-scroll">
              <GridLayout allBooks={allBooks} />
            </section>
          )}
          <div className="h-1" ref={observerTarget} />
        </>
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
        />
      )}
      {isToggledSort && <LibrarySortModal onClose={setIsToggledSort} refetchBooks={refetchBooks} />}
    </>
  );
};

export default Library;
