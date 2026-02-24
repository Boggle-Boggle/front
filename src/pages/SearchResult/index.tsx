import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { TextButton } from 'components/Button';
import { BackButton } from 'components/Header/BackButton';
import { Searchbar } from 'components/Searchbar';
import { IconArrowDown } from 'components/icons';

import { SearchResultList } from './shared/SearchResultList';
import { useSearchBooksQuery } from './useSearchBooksQuery';

const MSG_SEARCH_RESULT_COUNT = (count: number) => `${count}개의 검색 결과가 있습니다`;
const MSG_SEARCH_FILTER_PAPER = '종이책 검색';

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [localQuery, setLocalQuery] = useState<string>(query);

  const { data, isLoading, observerTarget } = useSearchBooksQuery(query);
  const searchResults = data ? data.pages.flatMap((page) => page.items) : [];
  const totalCount = data?.pages[0]?.totalResultCnt || 0;

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearchSubmit = () => {
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const handleSearchChange = (value: string) => setLocalQuery(value);
  const handleBookClick = (isbn: string) => navigate(`/detail/${isbn}`);

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      <div className="flex w-full items-center justify-start gap-2 pb-4 pr-mobile">
        <BackButton />
        <Searchbar value={localQuery} onChange={handleSearchChange} onSubmit={handleSearchSubmit} className="grow" />
      </div>

      <div className="flex w-full items-center justify-between px-mobile pb-7">
        <span className="text-caption1 font-medium text-neutral-60">{MSG_SEARCH_RESULT_COUNT(totalCount)}</span>
        <TextButton icon={IconArrowDown} iconPosition="right" onClick={() => {}}>
          {MSG_SEARCH_FILTER_PAPER}
        </TextButton>
      </div>

      <div className="flex-1 overflow-y-auto px-mobile">
        <SearchResultList books={searchResults} onBookClick={handleBookClick} isLoading={isLoading} />
        <div ref={observerTarget} className="h-4 w-full" />
      </div>
    </div>
  );
};

export default SearchResult;
