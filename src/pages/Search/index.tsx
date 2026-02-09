import Searchbar from './Searchbar';
import AuthorOtherWorksSection from './sections/AuthorOtherWorksSection';
import ContinueExploringSection from './sections/ContinueExploringSection';
import MostReadSection from './sections/MostReadSection';
import RealTimePopularSection from './sections/RealTimePopularSection';
import TrendingSection from './sections/TrendingSection';

const Search = () => {
  return (
    <div className="start flex h-dvh flex-col items-center justify-center overflow-scroll">
      <Searchbar className="w-full px-mobile" value="" onChange={() => {}} placeholder="책 제목을 입력해주세요" />
      <MostReadSection />
      <TrendingSection />
      <RealTimePopularSection />
      <AuthorOtherWorksSection />
      <ContinueExploringSection />
    </div>
  );
};

export default Search;
