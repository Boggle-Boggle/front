import { useInfiniteQuery } from '@tanstack/react-query';

import { useCallback, useEffect, useRef } from 'react';

import { PaginationResponse } from 'types/api';

const useInfiniteScroll = <T>(
  queryKey: unknown[],
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<PaginationResponse<T>>,
  enabled: boolean,
) => {
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNum < Math.ceil(lastPage.totalResultCnt / lastPage.itemsPerPage)) {
        return lastPage.pageNum + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return { data, refetch, isFetchingNextPage, observerTarget, isLoading };
};

export default useInfiniteScroll;
