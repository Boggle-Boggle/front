import { useState } from 'react';

import { Searchbar } from 'components/Searchbar';

import { AuthorOtherWorksSection } from './sections/AuthorOtherWorksSection';
import { MostReadSection } from './sections/MostReadSection';
import { PopularSearchSection } from './sections/PopularSearchSection';
import { RealTimePopularSection } from './sections/RealTimePopularSection';
import { RecentSearchSection } from './sections/RecentSearchSection';
import { TrendingSection } from './sections/TrendingSection';

const Search = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearchChange = () => {};

  const handleFocus = () => setIsSearchActive(true);

  return (
    <div className="h-full w-full flex-col items-center justify-start overflow-y-auto pb-safe-bottom pt-safe-top">
      <Searchbar className="w-full px-mobile" value="" onChange={handleSearchChange} onFocus={handleFocus} />
      {isSearchActive ? (
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
