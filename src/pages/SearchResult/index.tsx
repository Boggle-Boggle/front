import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';
import { BackButton } from 'components/Header/BackButton';
import { Searchbar } from 'components/Searchbar';
import { IconArrowDown } from 'components/icons';

import { SearchFilterActionSheet, type SearchFilterType } from './SearchFilterActionSheet';
import { SearchResultItem } from './SearchResultItem';
import type { SearchMediaType } from './api';
import { useSearchBooksQuery } from './useSearchBooksQuery';

const MSG_SEARCH_RESULT_COUNT = (count: number) => `${count}개의 검색 결과가 있습니다`;
const MSG_SEARCH_FILTER_PAPER = '종이책 검색';
const MSG_SEARCH_FILTER_EBOOK = '전자책 검색';
const LAYER_ID_SEARCH_FILTER = 'search-filter-bottom-sheet';

const SEARCH_MEDIA_TYPE_BY_FILTER: Record<SearchFilterType, SearchMediaType> = {
  ebook: 'EBOOK',
  paper: 'BOOK',
};

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [localQuery, setLocalQuery] = useState<string>(query);
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>('paper');
  const { push } = useLayerStore();

  const { data, isLoading, isFetchingNextPage, observerTarget } = useSearchBooksQuery(
    query,
    SEARCH_MEDIA_TYPE_BY_FILTER[searchFilter],
  );
  const searchResults = data ? data.pages.flatMap((page) => page.items) : [];
  const totalCount = data?.pages[0]?.total || 0;

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearchSubmit = () => {
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const handleSearchChange = (value: string) => setLocalQuery(value);

  const handleOpenFilter = () => {
    push({
      id: LAYER_ID_SEARCH_FILTER,
      component: <SearchFilterActionSheet selectedFilter={searchFilter} onSelectFilter={setSearchFilter} />,
    });
  };

  const searchFilterLabelByType = {
    paper: MSG_SEARCH_FILTER_PAPER,
    ebook: MSG_SEARCH_FILTER_EBOOK,
  } as const;

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
          text={searchFilterLabelByType[searchFilter]}
          size="md"
          variant="filled"
          className="text-neutral-80"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-mobile">
        {isLoading || (isFetchingNextPage && <div>검색중</div>)}
        {!isLoading && searchResults.length === 0 && <div>결과 없음</div>}
        {!isLoading && searchResults.length > 0 && (
          <ul className="flex w-full flex-col divide-y divide-neutral-20">
            {searchResults.map((book) => (
              <li key={book.isbn}>
                <SearchResultItem book={book} />
              </li>
            ))}
          </ul>
        )}
        <div ref={observerTarget} className="h-4 w-full" />
      </div>
    </div>
  );
};

export default SearchResult;
