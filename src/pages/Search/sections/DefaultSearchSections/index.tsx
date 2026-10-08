import { AuthorOtherWorksSection } from './AuthorOtherWorksSection';
import { MostReadSection } from './MostReadSection';
import { RealTimePopularSection } from './RealTimePopularSection';
import { TrendingSection } from './TrendingSection';

export const DefaultSearchSections = () => {
  return (
    <>
      <MostReadSection />
      <TrendingSection />
      <RealTimePopularSection />
      <AuthorOtherWorksSection />
    </>
  );
};
