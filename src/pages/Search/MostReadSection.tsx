import { HorizontalBookList } from './shared/HorizontalBookList';
import { Title } from './shared/Title';

const MSG_MOST_READ = '가장 많이 읽힌 책';

export const MostReadSection = () => {
  return (
    <>
      <Title text={MSG_MOST_READ} onLoadMore={() => {}} />
      <HorizontalBookList />
    </>
  );
};
