import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { IconButton } from 'components/Button';
import Highlight from 'components/Highlight';
import { IconLayoutGrid, IconLayoutList, IconSearch } from 'components/icons';

import { FilterSidebar } from './FilterSidebar';
import { ReadingSection } from './ReadingSection';
import { SortActionSheet } from './SortActionSheet';
import { WishlistSection } from './WishlistSection';
import { type ReadingLogSort, type ReadingLogStatus } from './api';
import { useLibraryQuery } from './useLibraryQuery';

type TabType = 'reading' | 'wishlist';
type ViewType = 'grid' | 'list';

const MSG_MYBOOKS_TAB_READING = '독서 기록';
const MSG_MYBOOKS_TAB_WISHLIST = '관심 도서';
const MSG_MYBOOKS_SORT_LATEST = '최신순';
const MSG_MYBOOKS_SORT_OLDEST = '과거순';
const MSG_MYBOOKS_SORT_POPULAR = '인기순';
// const MSG_MYBOOKS_EMPTY_WISHLIST = '관심 도서가 없습니다';
const MSG_MYBOOKS_ICON_SEARCH = '검색';
const MSG_MYBOOKS_ICON_VIEW_TO_GRID = '그리드형으로 보기';
const MSG_MYBOOKS_ICON_VIEW_TO_LIST = '리스트형으로 보기';
const MSG_MYBOOKS_FILTER_ALL = '모든 책모든 책모든 책모든 책모든 책';
const MSG_MYBOOKS_FILTER_DONE = '모두 읽은 책';
const MSG_MYBOOKS_FILTER_READING = '읽고 있는 책';
const MSG_MYBOOKS_FILTER_STOPPED = '중단한 책';

const STORAGE_KEY_MYBOOKS_VIEW_TYPE = 'mybooks-view-type';
const LAYER_ID_MYBOOKS_FILTER = 'mybooks-filter-sidebar';
const LAYER_ID_MYBOOKS_SORT = 'mybooks-sort-bottom-sheet';

const getInitialViewType = (): ViewType => {
  if (typeof window === 'undefined') return 'grid';

  const storedViewType = window.localStorage.getItem(STORAGE_KEY_MYBOOKS_VIEW_TYPE);
  return storedViewType === 'list' ? 'list' : 'grid';
};

const Library = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewType, setViewType] = useState<ViewType>(getInitialViewType);
  const [readingFilter, setReadingFilter] = useState<ReadingLogStatus>('ALL');
  const [sortType, setSortType] = useState<ReadingLogSort>('START_DATE_DESC');

  const { push, pop } = useLayerStore();
  const { data, observerTarget, isLoading } = useLibraryQuery(sortType, readingFilter);

  const books = data ? data.pages.flatMap((page) => page.items) : [];

  const filterOptionByType = {
    ALL: { value: 'ALL', label: MSG_MYBOOKS_FILTER_ALL },
    COMPLETED: { value: 'COMPLETED', label: MSG_MYBOOKS_FILTER_DONE },
    READING: { value: 'READING', label: MSG_MYBOOKS_FILTER_READING },
    DROPPED: { value: 'DROPPED', label: MSG_MYBOOKS_FILTER_STOPPED },
  } as const;

  const filterOptions = [
    filterOptionByType.ALL,
    filterOptionByType.COMPLETED,
    filterOptionByType.READING,
    filterOptionByType.DROPPED,
  ];

  const sortLabelByType: Partial<Record<ReadingLogSort, string>> = {
    START_DATE_DESC: MSG_MYBOOKS_SORT_LATEST,
    START_DATE_ASC: MSG_MYBOOKS_SORT_OLDEST,
    RATING_DESC: MSG_MYBOOKS_SORT_POPULAR,
  };
  const selectedFilterOption = filterOptionByType[readingFilter];
  const totalCount = data?.pages[0]?.totalResultCnt ?? books.length;
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
    const handleApplyFilter = (nextFilter: ReadingLogStatus) => {
      setReadingFilter(nextFilter);
      pop();
    };

    push({
      id: LAYER_ID_MYBOOKS_FILTER,
      component: (
        <FilterSidebar selectedFilter={readingFilter} filterOptions={filterOptions} onApplyFilter={handleApplyFilter} />
      ),
    });
  };

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_MYBOOKS_SORT,
      component: <SortActionSheet selectedSort={sortType} onSelectSort={setSortType} />,
    });
  };

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      {/* 독서기록/관심도서/보기방식 */}
      <div className="flex items-center justify-between px-mobile py-3">
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
          filterLabel={selectedFilterOption.label}
          sortLabel={sortLabelByType[sortType] ?? MSG_MYBOOKS_SORT_LATEST}
          viewMode={viewType}
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

export default Library;
