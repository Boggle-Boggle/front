import { useState } from 'react';
import useLayerStore from 'stores/useLayerStore';

import { IconButton, TextButton } from 'components/Button';
import Highlight from 'components/Highlight';
import { IconArrowDown, IconLayoutGrid, IconLayoutList, IconMenu, IconSearch } from 'components/icons';

import { ReadingBooksGrid } from './shared/ReadingBooksGrid';
import { ReadingBooksList } from './shared/ReadingBooksList';
import { useMyBooksQuery } from './useMyBooksQuery';

type TabType = 'reading' | 'wishlist';
type ViewType = 'grid' | 'list';

const MSG_MYBOOKS_TAB_READING = '독서 기록';
const MSG_MYBOOKS_TAB_WISHLIST = '관심 도서';
const MSG_MYBOOKS_ALL_BOOKS = '모든 책';
const MSG_MYBOOKS_SORT_LATEST = '최신순';
// const MSG_MYBOOKS_EMPTY_WISHLIST = '관심 도서가 없습니다';
const MSG_MYBOOKS_ICON_SEARCH = '검색';
const MSG_MYBOOKS_ICON_VIEW_TO_GRID = '그리드형으로 보기';
const MSG_MYBOOKS_ICON_VIEW_TO_LIST = '리스트형으로 보기';
const MSG_MYBOOKS_LOADING = '불러오는 중...';

const STORAGE_KEY_MYBOOKS_VIEW_TYPE = 'mybooks-view-type';

const getInitialViewType = (): ViewType => {
  if (typeof window === 'undefined') return 'grid';

  const storedViewType = window.localStorage.getItem(STORAGE_KEY_MYBOOKS_VIEW_TYPE);
  return storedViewType === 'list' ? 'list' : 'grid';
};

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewType, setViewType] = useState<ViewType>(getInitialViewType);

  const { push } = useLayerStore();
  const { data, observerTarget, isLoading } = useMyBooksQuery();

  const books = data ? data.pages.flatMap((page) => page.items) : [];
  const totalCount = data?.pages[0]?.totalResultCnt || 0;
  const isGridView = viewType === 'grid';
  const viewToggleLabel = isGridView ? MSG_MYBOOKS_ICON_VIEW_TO_LIST : MSG_MYBOOKS_ICON_VIEW_TO_GRID;
  const viewToggleIcon = isGridView ? IconLayoutList : IconLayoutGrid;

  const handleReadingTab = () => setActiveTab('reading');
  const handleWishlistTab = () => setActiveTab('wishlist');
  const handleToggleViewType = () => {
    setViewType((prevViewType) => {
      const nextViewType = prevViewType === 'grid' ? 'list' : 'grid';
      window.localStorage.setItem(STORAGE_KEY_MYBOOKS_VIEW_TYPE, nextViewType);

      return nextViewType;
    });
  };

  const handleOpenSidebar = () => {
    push({
      id: 'mybooks-sidebar',
      type: 'SIDEBAR',
      component: <div>사이드바</div>,
    });
  };

  return (
    <div className="flex h-full w-full flex-col px-mobile pb-safe-bottom pt-safe-top">
      {/* 독서기록/관심도서/보기방식 */}
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
          <IconButton icon={viewToggleIcon} label={viewToggleLabel} onClick={handleToggleViewType} />
          <IconButton icon={IconSearch} label={MSG_MYBOOKS_ICON_SEARCH} onClick={() => {}} />
        </div>
      </div>

      {/* 정렬 */}
      <div className="flex items-center justify-between pb-6">
        <button type="button" className="flex items-center gap-1" onClick={handleOpenSidebar}>
          <IconMenu className="size-icon-md" />
          <span className="text-body1">{MSG_MYBOOKS_ALL_BOOKS}</span>
          <span className="text-caption1 text-neutral-60">({totalCount})</span>
        </button>
        <TextButton variant="bg" size="sm" icon={IconArrowDown} iconPosition="right" onClick={() => {}}>
          {MSG_MYBOOKS_SORT_LATEST}
        </TextButton>
      </div>

      {activeTab === 'reading' && (
        <div className="flex flex-1 flex-col overflow-y-auto">
          {isGridView && <ReadingBooksGrid books={books} />}
          {!isGridView && <ReadingBooksList books={books} />}

          {isLoading && (
            <div className="flex justify-center py-4">
              <span className="text-caption1 text-neutral-60">{MSG_MYBOOKS_LOADING}</span>
            </div>
          )}
          <div ref={observerTarget} className="h-4 w-full" />
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="flex flex-1 flex-col overflow-y-auto">
          {isGridView && <ReadingBooksGrid books={books} />}
          {!isGridView && <ReadingBooksList books={books} />}

          {isLoading && (
            <div className="flex justify-center py-4">
              <span className="text-caption1 text-neutral-60">{MSG_MYBOOKS_LOADING}</span>
            </div>
          )}
          <div ref={observerTarget} className="h-4 w-full" />
        </div>
      )}
    </div>
  );
};

export default MyBooks;
