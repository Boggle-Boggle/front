import { useQuery } from '@tanstack/react-query';

import { disassemble, getChoseong } from 'es-hangul';
import { useState, useMemo } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { IconButton } from 'components/Button';
import { BackButton } from 'components/Header/BackButton';
import Highlight from 'components/Highlight';
import { Searchbar } from 'components/Searchbar';
import { IconLayoutGrid, IconLayoutList, IconSearch } from 'components/icons';

import type { ReadingLogStatus } from 'types';

import { FilterSidebar } from './FilterSidebar';
import { ReadingSection } from './ReadingSection';
import { SortActionSheet } from './SortActionSheet';
import { WishlistSection } from './WishlistSection';
import { getBookshelves, type ReadingLogSort } from './api';
import { useLibraryQuery } from './useLibraryQuery';
import { useWishlistQuery } from './useWishlistQuery';

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
const MSG_MYBOOKS_FILTER_ALL = '모든 책';
const MSG_MYBOOKS_FILTER_DONE = '다 읽은 책';
const MSG_MYBOOKS_FILTER_READING = '읽고 있는 책';
const MSG_MYBOOKS_FILTER_STOPPED = '중단한 책';
const MSG_MYBOOKS_SEARCH_PLACEHOLDER = '서재 안 도서 검색';

const STORAGE_KEY_MYBOOKS_VIEW_TYPE = 'mybooks-view-type';
const LAYER_ID_MYBOOKS_FILTER = 'mybooks-filter-sidebar';
const LAYER_ID_MYBOOKS_SORT = 'mybooks-sort-bottom-sheet';

const getInitialViewType = (): ViewType => {
  if (typeof window === 'undefined') return 'grid';

  const storedViewType = window.localStorage.getItem(STORAGE_KEY_MYBOOKS_VIEW_TYPE);
  return storedViewType === 'list' ? 'list' : 'grid';
};

const Library = () => {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewType, setViewType] = useState<ViewType>(getInitialViewType);
  const [readingFilter, setReadingFilter] = useState<ReadingLogStatus>('ALL');
  const [sortType, setSortType] = useState<ReadingLogSort>('START_DATE_DESC');
  const [bookshelfId, setBookshelfId] = useState<number>();

  const { push, pop } = useLayerStore();
  const {
    data: readingData,
    observerTarget: readingObserverTarget,
    isLoading: isReadingLoading,
  } = useLibraryQuery(sortType, readingFilter, bookshelfId, activeTab === 'reading');

  const { data: bookshelvesData } = useQuery({
    queryKey: ['bookshelves'],
    queryFn: getBookshelves,
  });
  const {
    data: wishlistData,
    observerTarget: wishlistObserverTarget,
    isLoading: isWishlistLoading,
  } = useWishlistQuery(activeTab === 'wishlist');

  const readingBooks = useMemo(() => {
    return readingData ? readingData.pages.flatMap((page) => page.items) : [];
  }, [readingData]);

  const wishlistBooks = useMemo(() => {
    return wishlistData ? wishlistData.pages.flatMap((page) => page.items) : [];
  }, [wishlistData]);

  // 검색 키워드에 따른 독서 기록 도서 필터링 (초성 및 자모분리 지원)
  const filteredReadingBooks = useMemo(() => {
    const cleanedKeyword = searchKeyword.trim().toLowerCase();
    if (!cleanedKeyword) return readingBooks;

    const disKeyword = disassemble(cleanedKeyword);
    const choKeyword = getChoseong(cleanedKeyword);

    return readingBooks.filter((book) => {
      const lowerTitle = book.title.toLowerCase();
      if (lowerTitle.includes(cleanedKeyword)) return true;
      if (disassemble(lowerTitle).includes(disKeyword)) return true;
      if (getChoseong(lowerTitle).includes(choKeyword)) return true;

      return false;
    });
  }, [searchKeyword, readingBooks]);

  // 검색 키워드에 따른 관심 도서 필터링 (초성 및 자모분리 지원)
  const filteredWishlistBooks = useMemo(() => {
    const cleanedKeyword = searchKeyword.trim().toLowerCase();
    if (!cleanedKeyword) return wishlistBooks;

    const disKeyword = disassemble(cleanedKeyword);
    const choKeyword = getChoseong(cleanedKeyword);

    return wishlistBooks.filter((book) => {
      const lowerTitle = book.title.toLowerCase();
      if (lowerTitle.includes(cleanedKeyword)) return true;
      if (disassemble(lowerTitle).includes(disKeyword)) return true;
      if (getChoseong(lowerTitle).includes(choKeyword)) return true;

      return false;
    });
  }, [searchKeyword, wishlistBooks]);

  const filterOptionByType: Record<ReadingLogStatus, { value: ReadingLogStatus; label: string }> = {
    ALL: { value: 'ALL', label: MSG_MYBOOKS_FILTER_ALL },
    COMPLETED: { value: 'COMPLETED', label: MSG_MYBOOKS_FILTER_DONE },
    READING: { value: 'READING', label: MSG_MYBOOKS_FILTER_READING },
    DROPPED: { value: 'DROPPED', label: MSG_MYBOOKS_FILTER_STOPPED },
  };

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
  const selectedBookshelf = bookshelvesData?.find((group) => group.id === bookshelfId);
  const { label } = selectedFilterOption;
  const filterLabel = selectedBookshelf ? `${label} (${selectedBookshelf.name})` : label;

  const totalCount = readingData?.pages[0]?.totalResultCnt ?? readingBooks.length;
  const isGridView = viewType === 'grid';
  const viewToggleLabel = isGridView ? MSG_MYBOOKS_ICON_VIEW_TO_LIST : MSG_MYBOOKS_ICON_VIEW_TO_GRID;
  const viewToggleIcon = isGridView ? IconLayoutList : IconLayoutGrid;

  const handleReadingTab = () => {
    setActiveTab('reading');
    setSearchKeyword('');
  };

  const handleWishlistTab = () => {
    setActiveTab('wishlist');
    setSearchKeyword('');
  };

  const handleToggleViewType = () => {
    setViewType((prevViewType) => {
      const nextViewType = prevViewType === 'grid' ? 'list' : 'grid';
      window.localStorage.setItem(STORAGE_KEY_MYBOOKS_VIEW_TYPE, nextViewType);

      return nextViewType;
    });
  };

  const handleOpenFilterLayer = () => {
    const handleApplyFilter = (nextFilter: ReadingLogStatus, nextBookshelfId?: number) => {
      setReadingFilter(nextFilter);
      setBookshelfId(nextBookshelfId);
      pop();
    };

    push({
      id: LAYER_ID_MYBOOKS_FILTER,
      component: (
        <FilterSidebar
          selectedFilter={readingFilter}
          filterOptions={filterOptions}
          onApplyFilter={handleApplyFilter}
          selectedBookshelfId={bookshelfId}
        />
      ),
    });
  };

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_MYBOOKS_SORT,
      component: <SortActionSheet selectedSort={sortType} onSelectSort={setSortType} />,
    });
  };

  const handleOpenSearchMode = () => setIsSearchMode(true);

  const handleCloseSearchMode = () => {
    setIsSearchMode(false);
    setSearchKeyword('');
  };

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      {/* 독서기록/관심도서/보기방식 혹은 검색바 */}
      {isSearchMode ? (
        <div className="flex w-full items-center justify-start py-3 pr-mobile">
          <BackButton onClick={handleCloseSearchMode} />
          <Searchbar
            value={searchKeyword}
            onChange={setSearchKeyword}
            placeholder={MSG_MYBOOKS_SEARCH_PLACEHOLDER}
            className="grow"
          />
        </div>
      ) : (
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
            <IconButton icon={IconSearch} label={MSG_MYBOOKS_ICON_SEARCH} onClick={handleOpenSearchMode} />
          </div>
        </div>
      )}

      {activeTab === 'reading' && (
        <ReadingSection
          books={filteredReadingBooks}
          totalCount={searchKeyword.trim() ? filteredReadingBooks.length : totalCount}
          filterLabel={filterLabel}
          sortLabel={sortLabelByType[sortType] ?? MSG_MYBOOKS_SORT_LATEST}
          viewMode={viewType}
          isLoading={isReadingLoading}
          observerTarget={searchKeyword.trim() ? { current: null } : readingObserverTarget}
          onOpenFilterLayer={handleOpenFilterLayer}
          onOpenSortLayer={handleOpenSortLayer}
        />
      )}

      {activeTab === 'wishlist' && (
        <WishlistSection
          books={filteredWishlistBooks}
          isLoading={isWishlistLoading}
          observerTarget={searchKeyword.trim() ? { current: null } : wishlistObserverTarget}
        />
      )}
    </div>
  );
};

export default Library;
