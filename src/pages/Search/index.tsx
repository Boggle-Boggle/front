import Searchbar from './Searchbar';
import AuthorOtherWorksSection from './sections/AuthorOtherWorksSection';
import MostReadSection from './sections/MostReadSection';
import RealTimePopularSection from './sections/RealTimePopularSection';
import TrendingSection from './sections/TrendingSection';

const Search = () => {
  return (
    <div className="h-full w-full flex-col items-center justify-start overflow-y-auto">
      <Searchbar className="w-full px-mobile" value="" onChange={() => {}} placeholder="책 제목을 입력해주세요" />
      <MostReadSection />
      <TrendingSection />
      <RealTimePopularSection />
      <AuthorOtherWorksSection />
    </div>
  );
};

export default Search;
