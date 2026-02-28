import { useState } from 'react';
import useLayerStore from 'stores/useLayerStore';

import { IconButton } from 'components/Button';
import Highlight from 'components/Highlight';
import { IconLayoutGrid, IconLayoutList, IconSearch } from 'components/icons';

import { ReadingSection } from './ReadingSection';
import { WishlistSection } from './WishlistSection';
import { useMyBooksQuery } from './useMyBooksQuery';

type TabType = 'reading' | 'wishlist';
type ViewType = 'grid' | 'list';

const MSG_MYBOOKS_TAB_READING = '독서 기록';
const MSG_MYBOOKS_TAB_WISHLIST = '관심 도서';
const MSG_MYBOOKS_FILTER_SIDEBAR = '전체 도서 필터';
const MSG_MYBOOKS_SORT_LAYER = '정렬 옵션';
// const MSG_MYBOOKS_EMPTY_WISHLIST = '관심 도서가 없습니다';
const MSG_MYBOOKS_ICON_SEARCH = '검색';
const MSG_MYBOOKS_ICON_VIEW_TO_GRID = '그리드형으로 보기';
const MSG_MYBOOKS_ICON_VIEW_TO_LIST = '리스트형으로 보기';

const STORAGE_KEY_MYBOOKS_VIEW_TYPE = 'mybooks-view-type';
const LAYER_ID_MYBOOKS_FILTER = 'mybooks-filter-sidebar';
const LAYER_ID_MYBOOKS_SORT = 'mybooks-sort-bottom-sheet';

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

  const handleOpenFilterLayer = () => {
    push({
      id: LAYER_ID_MYBOOKS_FILTER,
      type: 'SIDEBAR',
      component: <div>{MSG_MYBOOKS_FILTER_SIDEBAR}</div>,
    });
  };

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_MYBOOKS_SORT,
      type: 'BOTTOM_SHEET',
      component: <div>{MSG_MYBOOKS_SORT_LAYER}</div>,
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
          {activeTab === 'reading' && (
            <IconButton icon={viewToggleIcon} label={viewToggleLabel} onClick={handleToggleViewType} />
          )}
          <IconButton icon={IconSearch} label={MSG_MYBOOKS_ICON_SEARCH} onClick={() => {}} />
        </div>
      </div>

      {activeTab === 'reading' && (
        <ReadingSection
          books={books}
          totalCount={totalCount}
          isGridView={isGridView}
          isLoading={isLoading}
          observerTarget={observerTarget}
          onOpenFilterLayer={handleOpenFilterLayer}
          onOpenSortLayer={handleOpenSortLayer}
        />
      )}

      {activeTab === 'wishlist' && (
        <WishlistSection books={books} isLoading={isLoading} observerTarget={observerTarget} />
      )}
    </div>
  );
};

export default MyBooks;
