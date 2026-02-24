import useInfiniteScroll from 'hooks/useInfiniteScroll';

import { getMyBooksMock } from './mockData';
import { MyBook } from './types';

export const useMyBooksQuery = () => {
  return useInfiniteScroll<MyBook[]>(['myBooks', 'list'], ({ pageParam = 1 }) => getMyBooksMock(pageParam), true);
};
