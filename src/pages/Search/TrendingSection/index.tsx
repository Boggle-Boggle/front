import { useNavigate } from 'react-router-dom';

import { HorizontalBookList } from '../shared/HorizontalBookList';
import { Title } from '../shared/Title';

const MSG_TRENDING = '요즘 주목받고 있는 책';

export const TrendingSection = () => {
  const navigate = useNavigate();

  const handleLoadMore = () => {
    navigate('/search/trending');
  };

  return (
    <>
      <Title text={MSG_TRENDING} onLoadMore={handleLoadMore} />
      <HorizontalBookList />
    </>
  );
};
