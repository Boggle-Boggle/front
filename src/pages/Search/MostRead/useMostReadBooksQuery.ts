import useInfiniteScroll from 'hooks/useInfiniteScroll';

import { getMostReadBooksMock } from './mock';
import { MostReadBook } from './types';

export const useMostReadBooksQuery = () => {
  return useInfiniteScroll<MostReadBook[]>(
    ['books', 'mostRead'],
    ({ pageParam = 1 }) => getMostReadBooksMock(pageParam),
    true,
  );
};
