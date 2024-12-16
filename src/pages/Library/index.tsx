import { useState } from 'react';
import { FiAlignCenter, FiGrid, FiList } from 'react-icons/fi';

import Header from 'components/ui/Header';
import SearchBar from 'components/ui/SearchBar';

import GridLayout from './GridLayout';
import ListLayout from './ListLayout';

const Library = () => {
  const [value, setValue] = useState<string>('');
  const [layout, setLayout] = useState<'grid' | 'list'>('list');

  const handleToggle = () => {
    // TODO 디자인 변경시 수정 예정
  };

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
              <FiAlignCenter style={{ width: '24px', height: '24px' }} />
            </div>
          ),
          handleRightBtnClick: handleToggle,
        }}
        title={{ text: '전체보기' }}
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
    </>
  );
};

export default Library;
