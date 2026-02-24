import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { getSearchBooksMock } from 'services/mock/search';

import { Book } from 'types/book';

export const useSearchBooksQuery = (query: string) => {
  return useInfiniteScroll<Book[]>(
    ['books', 'search', query],
    ({ pageParam = 1 }) => getSearchBooksMock(query, pageParam),
    !!query,
  );
};
