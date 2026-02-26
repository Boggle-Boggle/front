import { useState } from 'react';
import useLayerStore from 'stores/useLayerStore';

import { IconButton, TextButton } from 'components/Button';
import Highlight from 'components/Highlight';
import { IconArrowDown, IconLayoutGrid, IconMenu, IconSearch } from 'components/icons';

import { BookCard } from './BookCard';
import { useMyBooksQuery } from './useMyBooksQuery';

type TabType = 'reading' | 'wishlist';

const MSG_MYBOOKS_TAB_READING = '독서 기록';
const MSG_MYBOOKS_TAB_WISHLIST = '관심 도서';
const MSG_MYBOOKS_ALL_BOOKS = '모든 책';
const MSG_MYBOOKS_SORT_LATEST = '최신순';
const MSG_MYBOOKS_EMPTY_WISHLIST = '관심 도서가 없습니다';
const MSG_MYBOOKS_SIDEBAR_TITLE = '서재 목록';
const MSG_MYBOOKS_ICON_SORT = '정렬';
const MSG_MYBOOKS_ICON_SEARCH = '검색';

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reading');

  const { push } = useLayerStore();
  const { data, observerTarget, isLoading } = useMyBooksQuery();

  const books = data ? data.pages.flatMap((page) => page.items) : [];
  const totalCount = data?.pages[0]?.totalResultCnt || 0;

  const handleReadingTab = () => setActiveTab('reading');
  const handleWishlistTab = () => setActiveTab('wishlist');

  const handleOpenSidebar = () => {
    push({
      id: 'mybooks-sidebar',
      type: 'SIDEBAR',
      component: (
        <div className="flex h-full flex-col gap-4 p-4 pt-6">
          <p className="text-title2">{MSG_MYBOOKS_SIDEBAR_TITLE}</p>
        </div>
      ),
    });
  };

  return (
    <div className="flex h-full w-full flex-col px-mobile pb-safe-bottom pt-safe-top">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={handleReadingTab}>
            {activeTab === 'reading' ? (
              <Highlight text={MSG_MYBOOKS_TAB_READING} className="text-title2" />
            ) : (
              <span className="text-title2 text-neutral-40">{MSG_MYBOOKS_TAB_READING}</span>
            )}
          </button>
          <button type="button" onClick={handleWishlistTab}>
            {activeTab === 'wishlist' ? (
              <Highlight text={MSG_MYBOOKS_TAB_WISHLIST} className="text-title2" />
            ) : (
              <span className="text-title2 text-neutral-40">{MSG_MYBOOKS_TAB_WISHLIST}</span>
            )}
          </button>
        </div>
        <div className="flex items-center">
          <IconButton icon={IconLayoutGrid} label={MSG_MYBOOKS_ICON_SORT} onClick={() => {}} />
          <IconButton icon={IconSearch} label={MSG_MYBOOKS_ICON_SEARCH} onClick={() => {}} />
        </div>
      </div>

      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-1">
          <button type="button" className="flex items-center gap-2" onClick={handleOpenSidebar}>
            <IconMenu className="size-icon-md" />
            <span className="text-body1">{MSG_MYBOOKS_ALL_BOOKS}</span>
            <span className="text-caption1 text-neutral-60">({totalCount})</span>
          </button>
        </div>
        <TextButton variant="bg" size="sm" icon={IconArrowDown} iconPosition="right" onClick={() => {}}>
          {MSG_MYBOOKS_SORT_LATEST}
        </TextButton>
      </div>

      {activeTab === 'reading' ? (
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="grid grid-cols-3 gap-x-4 gap-y-7 pb-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {isLoading && <div> loading... </div>}
          <div ref={observerTarget} className="h-4 w-full" />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-body1 text-neutral-60">{MSG_MYBOOKS_EMPTY_WISHLIST}</span>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
