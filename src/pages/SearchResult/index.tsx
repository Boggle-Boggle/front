import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';
import { BackButton } from 'components/Header/BackButton';
import { Loading } from 'components/Loading';
import { Searchbar } from 'components/Searchbar';
import { IconArrowDown } from 'components/icons';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { SearchFilterActionSheet, type SearchFilterType } from './SearchFilterActionSheet';
import { SearchResultItem } from './SearchResultItem';
import type { SearchMediaType } from './api';
import { useSearchBooksQuery } from './useSearchBooksQuery';

const MSG_SEARCH_RESULT_COUNT = (count: number) => `${count}개의 검색 결과가 있습니다`;
const MSG_SEARCH_FILTER_PAPER = '종이책 검색';
const MSG_SEARCH_FILTER_EBOOK = '전자책 검색';
const LAYER_ID_SEARCH_FILTER = 'search-filter-bottom-sheet';

const DEFAULT_SEARCH_MEDIA_TYPE: SearchMediaType = 'BOOK';

const SEARCH_FILTER_OPTION_BY_FILTER: Record<SearchFilterType, { label: string; mediaType: SearchMediaType }> = {
  ebook: {
    label: MSG_SEARCH_FILTER_EBOOK,
    mediaType: 'EBOOK',
  },
  paper: {
    label: MSG_SEARCH_FILTER_PAPER,
    mediaType: 'BOOK',
  },
};

const SEARCH_FILTER_BY_MEDIA_TYPE: Record<SearchMediaType, SearchFilterType> = {
  BOOK: 'paper',
  EBOOK: 'ebook',
};

const getSearchMediaType = (type: string | null): SearchMediaType => {
  if (type === 'EBOOK') return 'EBOOK';

  return DEFAULT_SEARCH_MEDIA_TYPE;
};

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchMediaType = getSearchMediaType(searchParams.get('type'));
  const searchFilter = SEARCH_FILTER_BY_MEDIA_TYPE[searchMediaType];

  const [localQuery, setLocalQuery] = useState<string>(query);
  const { push } = useLayerStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollStorageKey = `search_result_scroll_top_${query}_${searchMediaType}`;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useSearchBooksQuery(
    query,
    searchMediaType,
  );
  const { observerTarget } = useInfiniteScrollObserver({
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
    onIntersect: fetchNextPage,
  });

  const searchResults = data ? data.pages.flatMap((page) => page.data.items) : [];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      sessionStorage.setItem(scrollStorageKey, String(scrollContainerRef.current.scrollTop));
    }
  };

  useLayoutEffect(() => {
    if (searchResults.length > 0 && scrollContainerRef.current) {
      const savedScrollTop = sessionStorage.getItem(scrollStorageKey);
      if (savedScrollTop) {
        scrollContainerRef.current.scrollTop = Number(savedScrollTop);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults.length, scrollStorageKey]);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearchSubmit = () => {
    const trimmedQuery = localQuery.trim();

    if (!trimmedQuery) return;

    setSearchParams({ q: trimmedQuery, type: searchMediaType }, { replace: true });
  };

  const handleSearchChange = (value: string) => setLocalQuery(value);

  const handleSelectFilter = (filter: SearchFilterType) => {
    setSearchParams(
      {
        q: query,
        type: SEARCH_FILTER_OPTION_BY_FILTER[filter].mediaType,
      },
      { replace: true },
    );
  };

  const handleOpenFilter = () => {
    push({
      id: LAYER_ID_SEARCH_FILTER,
      component: <SearchFilterActionSheet selectedFilter={searchFilter} onSelectFilter={handleSelectFilter} />,
    });
  };

  const totalCount = data?.pages[0]?.meta.page.total || 0;
  const searchFilterLabel = SEARCH_FILTER_OPTION_BY_FILTER[searchFilter].label;

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
        <div className="flex w-full items-center justify-start gap-2 pb-4 pr-mobile">
          <BackButton />
          <Searchbar value={localQuery} onChange={handleSearchChange} onSubmit={handleSearchSubmit} className="grow" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      <div className="flex w-full items-center justify-start gap-2 pb-4 pr-mobile">
        <BackButton />
        <Searchbar value={localQuery} onChange={handleSearchChange} onSubmit={handleSearchSubmit} className="grow" />
      </div>

      <div className="flex w-full items-center justify-between px-mobile pb-5">
        <span className="text-caption1 font-medium text-neutral-60">{MSG_SEARCH_RESULT_COUNT(totalCount)}</span>
        <TextButton
          rightIcon={IconArrowDown}
          onClick={handleOpenFilter}
          text={searchFilterLabel}
          size="md"
          variant="filled"
          className="text-neutral-80"
        />
      </div>

      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-mobile">
        {searchResults.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center py-20 text-body2 text-neutral-60">
            검색 결과가 없습니다.
          </div>
        ) : (
          <ul className="flex w-full flex-col divide-y divide-neutral-20">
            {searchResults.map((book) => (
              <li key={book.isbn13}>
                <SearchResultItem book={book} />
              </li>
            ))}
          </ul>
        )}
        {(isFetchingNextPage || hasNextPage) && <div ref={observerTarget} className="h-4 w-full" />}
      </div>
    </div>
  );
};

export default SearchResult;
