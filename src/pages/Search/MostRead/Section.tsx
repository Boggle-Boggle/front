import { useNavigate } from 'react-router-dom';

import { useMostReadBooksQuery } from './useMostReadBooksQuery';
import { HorizontalBookList } from '../shared/HorizontalBookList';
import { Title } from '../shared/Title';

const MSG_MOST_READ = '가장 많이 읽힌 책';

export const MostReadSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMostReadBooksQuery();

  const handleLoadMore = () => navigate('/search/most-read');

  const books = data?.items ?? [];

  if (isLoading) return null;

  return (
    <>
      <Title text={MSG_MOST_READ} onLoadMore={handleLoadMore} />
      <HorizontalBookList books={books} />
    </>
  );
};
