import { HorizontalBookList } from '../shared/HorizontalBookList';
import { Title } from '../shared/Title';

const AuthorOtherWorksSection = () => {
  return (
    <>
      <Title text="[작가]의 다른 작품" />
      <HorizontalBookList />
    </>
  );
};

export default AuthorOtherWorksSection;
