import { useNavigate } from 'react-router-dom';

import { useTrendingBooksQuery } from './useTrendingBooksQuery';
import { HorizontalBookList } from '../shared/HorizontalBookList';
import { Title } from '../shared/Title';

const MSG_TRENDING = '요즘 주목받고 있는 책';

export const TrendingSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useTrendingBooksQuery();

  const handleLoadMore = () => navigate('/search/trending');

  const books = data?.items ?? [];

  if (isLoading || books.length === 0) {
    return null;
  }

  return (
    <>
      <Title text={MSG_TRENDING} onLoadMore={handleLoadMore} />
      <HorizontalBookList books={books} />
    </>
  );
};
