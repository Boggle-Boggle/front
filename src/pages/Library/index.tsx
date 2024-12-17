import { useState } from 'react';
import { FiMoreVertical, FiGrid, FiList } from 'react-icons/fi';

import Header from 'components/Header';
import SearchBar from 'components/SearchBar';

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
      <section className="height-content overflow-y-scroll bg-main pb-10">
        {layout === 'grid' ? <GridLayout /> : <ListLayout />}
      </section>

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
