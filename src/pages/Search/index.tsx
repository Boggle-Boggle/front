import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconButton from 'components/Button/IconButton';
import { Searchbar } from 'components/Searchbar';
import BookPlus from 'components/icons/BookPlus';

import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { AuthorOtherWorksSection } from './AuthorOtherWorks/Section';
import { MostReadSection } from './MostRead/Section';
import { PopularSearchSection } from './PopularSearch/Section';
import { RealTimePopularSection } from './RealTimePopular/Section';
import { RecentSearchSection } from './RecentSearch/Section';
import { TrendingSection } from './Trending/Section';

const MSG_SEARCH_ADD_BOOK_LABEL = '도서 추가';

const Search = () => {
  const { state } = useLocation();
  const shouldAutoFocus = state?.autoFocus ?? false;

  const [query, setQuery] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(shouldAutoFocus);
  const navigate = useNavigate();

  const scrollRef = useScrollRestoration<HTMLDivElement>();

  const handleSearchChange = (value: string) => setQuery(value);

  const handleFocus = () => setIsSearched(true);

  const handleSearchSubmit = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search/result?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleAddCustomBook = () => navigate('/search/add');

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden pt-safe-top">
      <div className="flex w-full items-center pl-mobile">
        <Searchbar
          className="flex-1"
          value={query}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onSubmit={handleSearchSubmit}
          autoFocus={shouldAutoFocus}
        />
        <IconButton label={MSG_SEARCH_ADD_BOOK_LABEL} icon={BookPlus} onClick={handleAddCustomBook} />
      </div>
      <div ref={scrollRef} className="mt-5 min-h-0 w-full flex-1 overflow-y-auto">
        {isSearched ? (
          <>
            <RecentSearchSection />
            <PopularSearchSection />
          </>
        ) : (
          <>
            <MostReadSection />
            <TrendingSection />
            <RealTimePopularSection />
            <AuthorOtherWorksSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
