import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Searchbar } from 'components/Searchbar';

import { AuthorOtherWorksSection } from './AuthorOtherWorks/Section';
import { MostReadSection } from './MostRead/Section';
import { PopularSearchSection } from './PopularSearchSection';
import { RealTimePopularSection } from './RealTimePopular/Section';
import { RecentSearchSection } from './RecentSearchSection';
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
    <div className="h-full w-full flex-col items-center justify-start overflow-y-auto pb-safe-bottom pt-safe-top">
      <Searchbar
        className="w-full px-mobile"
        value={query}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onSubmit={handleSearchSubmit}
      />
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
  );
};

export default Search;
