import { HorizontalBookList } from '../shared/HorizontalBookList';
import Title from '../shared/Title';

const TrendingSection = () => {
  return (
    <>
      <Title text="요즘 주목받고 있는 책" />
      <HorizontalBookList />
    </>
  );
};

export default TrendingSection;
