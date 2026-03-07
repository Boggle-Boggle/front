import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Searchbar } from 'components/Searchbar';

import { AuthorOtherWorksSection } from './AuthorOtherWorks/Section';
import { MostReadSection } from './MostRead/Section';
import { PopularSearchSection } from './PopularSearch/Section';
import { RealTimePopularSection } from './RealTimePopular/Section';
import { RecentSearchSection } from './RecentSearch/Section';
import { TrendingSection } from './Trending/Section';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => setQuery(value);

  const handleFocus = () => setIsSearched(true);

  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    navigate(`/search/result?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden pb-safe-bottom pt-safe-top">
      <Searchbar
        className="w-full px-mobile"
        value={query}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onSubmit={handleSearchSubmit}
      />
      <div className="mt-5 min-h-0 w-full flex-1 overflow-y-auto">
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
