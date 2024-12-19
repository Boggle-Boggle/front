import { useEffect, useState } from 'react';
import { FiMoreVertical, FiGrid, FiList } from 'react-icons/fi';

import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import Loading from 'pages/Loading';

import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getLibraryBooks } from 'services/library';

import GridLayout from './GridLayout';
import LibraryEditedModal from './LibraryEditedModal';
import LibrarySelectModal from './LibrarySelectModal';
import LibrarySortModal from './LibrarySortModal';
import ListLayout from './ListLayout';

const Library = () => {
  const [value, setValue] = useState<string>('');
  const [layout, setLayout] = useState<'grid' | 'list'>('list');

  const [isToggledLibrarySelect, setIsToggledLibrarySelect] = useState<boolean>(false);
  const [isToggledLibraryEdit, setIsToggledLibraryEdit] = useState<boolean>(false);
  const [isToggledSort, setIsToggledSort] = useState<boolean>(false);

  const { data, refetch, observerTarget, isLoading } = useInfiniteScroll(
    [],
    ({ pageParam = 1 }) => getLibraryBooks({}, pageParam),
    false,
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) <Loading />;

  const allBooks = data?.pages.flatMap((page) => page.items) || [];
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
        title={{ text: '전체보기', handleTitleClick: () => setIsToggledLibrarySelect(true) }}
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
        <section className="height-content overflow-y-scroll bg-main">
          {layout === 'grid' ? <GridLayout allBooks={allBooks} /> : <ListLayout allBooks={allBooks} />}
          <div className="h-5" ref={observerTarget} />
        </section>
      )}

      {isToggledLibrarySelect && (
        <LibrarySelectModal onClose={setIsToggledLibrarySelect} handleEdit={() => setIsToggledLibraryEdit(true)} />
      )}
      {isToggledLibraryEdit && (
        <LibraryEditedModal
          onClose={setIsToggledLibraryEdit}
          handleOpenSelect={() => setIsToggledLibrarySelect(true)}
        />
      )}
      {isToggledSort && <LibrarySortModal onClose={setIsToggledSort} />}
    </>
  );
};

export default Library;
