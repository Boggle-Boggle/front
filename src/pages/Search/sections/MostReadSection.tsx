import { HorizontalBookList } from '../shared/HorizontalBookList';
import { Title } from '../shared/Title';

const MostReadSection = () => {
  return (
    <>
      <Title text="가장 많이 읽힌 책" />
      <HorizontalBookList />
    </>
  );
};

export default MostReadSection;
