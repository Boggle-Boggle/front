import { useState } from 'react';
import useLayerStore from 'stores/useLayerStore';

import { IconButton } from 'components/Button';
import Highlight from 'components/Highlight';
import { IconLayoutGrid, IconLayoutList, IconSearch } from 'components/icons';

import { FilterSidebar } from './FilterSidebar';
import { ReadingSection } from './ReadingSection';
import { SortActionSheet, type SortType } from './SortActionSheet';
import { WishlistSection } from './WishlistSection';
import { useMyBooksQuery } from './useMyBooksQuery';

type TabType = 'reading' | 'wishlist';
type ViewType = 'grid' | 'list';
type ReadingFilterType = 'all' | 'done' | 'reading' | 'stopped';

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

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewType, setViewType] = useState<ViewType>(getInitialViewType);
  const [readingFilter, setReadingFilter] = useState<ReadingFilterType>('all');
  const [sortType, setSortType] = useState<SortType>('latest');

  const { push, pop } = useLayerStore();
  const { data, observerTarget, isLoading } = useMyBooksQuery();

  const books = data ? data.pages.flatMap((page) => page.items) : [];
  const readingBooks = books;
  const doneBooks = readingBooks.filter((book) => book.readingStatus === '완독');
  const activeReadingBooks = readingBooks.filter((book) => book.readingStatus === '읽는중');
  const stoppedBooks = readingBooks.filter((book) => book.readingStatus === '중단');

  const filterOptionByType = {
    all: { value: 'all', label: MSG_MYBOOKS_FILTER_ALL, count: readingBooks.length },
    done: { value: 'done', label: MSG_MYBOOKS_FILTER_DONE, count: doneBooks.length },
    reading: { value: 'reading', label: MSG_MYBOOKS_FILTER_READING, count: activeReadingBooks.length },
    stopped: { value: 'stopped', label: MSG_MYBOOKS_FILTER_STOPPED, count: stoppedBooks.length },
  } as const;

  const filterOptions = [
    filterOptionByType.all,
    filterOptionByType.done,
    filterOptionByType.reading,
    filterOptionByType.stopped,
  ];

  const filteredReadingBooks =
    readingFilter === 'all'
      ? readingBooks
      : readingFilter === 'done'
        ? doneBooks
        : readingFilter === 'reading'
          ? activeReadingBooks
          : stoppedBooks;
  const sortedReadingBooks = [...filteredReadingBooks].sort((a, b) => {
    if (sortType === 'oldest') {
      return a.id - b.id;
    }

    if (sortType === 'popular') {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      return b.readCount - a.readCount;
    }

    return b.id - a.id;
  });
  const sortLabelByType = {
    latest: MSG_MYBOOKS_SORT_LATEST,
    oldest: MSG_MYBOOKS_SORT_OLDEST,
    popular: MSG_MYBOOKS_SORT_POPULAR,
  } as const;
  const selectedFilterOption = filterOptionByType[readingFilter];
  const totalCount = sortedReadingBooks.length;
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
    const handleApplyFilter = (nextFilter: ReadingFilterType) => {
      setReadingFilter(nextFilter);
      pop();
    };

    push({
      id: LAYER_ID_MYBOOKS_FILTER,
      type: 'SIDEBAR',
      component: (
        <FilterSidebar selectedFilter={readingFilter} filterOptions={filterOptions} onApplyFilter={handleApplyFilter} />
      ),
    });
  };

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_MYBOOKS_SORT,
      type: 'BOTTOM_SHEET',
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
          books={sortedReadingBooks}
          totalCount={totalCount}
          filterLabel={selectedFilterOption.label}
          sortLabel={sortLabelByType[sortType]}
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

export default MyBooks;
