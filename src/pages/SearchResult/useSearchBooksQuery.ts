import { useInfiniteQuery } from '@tanstack/react-query';

import { getNextPageParam } from 'utils/pagination';

import { getSearchBooks, type SearchMediaType } from './api';

export const useSearchBooksQuery = (query: string, type: SearchMediaType) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['books', 'search', query, type],
    queryFn: ({ pageParam }) =>
      getSearchBooks({
        page: pageParam,
        query,
        type,
      }),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage.meta.page),
    initialPageParam: 1,
    enabled: !!query.trim(),
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
