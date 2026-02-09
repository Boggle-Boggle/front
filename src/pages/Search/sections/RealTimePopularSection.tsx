import { RealTimePopularList } from '../shared/RealTimePopularList';
import { Title } from '../shared/Title';

const RealTimePopularSection = () => {
  return (
    <>
      <Title text="실시간 인기도서" />
      <RealTimePopularList />
    </>
  );
};

export default RealTimePopularSection;
