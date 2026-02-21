import { HorizontalBookList } from '../shared/HorizontalBookList';
import Title from '../shared/Title';

export const MostReadSection = () => {
  return (
    <>
      <Title text="가장 많이 읽힌 책" onLoadMore={() => {}} />
      <HorizontalBookList />
    </>
  );
};
