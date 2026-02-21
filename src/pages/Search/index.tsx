import { Searchbar } from 'components/Searchbar';

import { AuthorOtherWorksSection } from './sections/AuthorOtherWorksSection';
import { MostReadSection } from './sections/MostReadSection';
import { RealTimePopularSection } from './sections/RealTimePopularSection';
import { TrendingSection } from './sections/TrendingSection';

const Search = () => {
  return (
    <div className="h-full w-full flex-col items-center justify-start overflow-y-auto pb-safe-bottom pt-safe-top">
      <Searchbar className="w-full px-mobile" value="" onChange={() => {}} />
      <MostReadSection />
      <TrendingSection />
      <RealTimePopularSection />
      <AuthorOtherWorksSection />
    </div>
  );
};

export default Search;
