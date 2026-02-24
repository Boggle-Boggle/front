import { HorizontalBookList } from './shared/HorizontalBookList';
import { Title } from './shared/Title';

const MSG_TRENDING = '요즘 주목받고 있는 책';

export const TrendingSection = () => {
  return (
    <>
      <Title text={MSG_TRENDING} />
      <HorizontalBookList />
    </>
  );
};
