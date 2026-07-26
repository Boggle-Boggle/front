import { useInfiniteQuery } from '@tanstack/react-query';

import type { PaginationMockResponse } from 'api.types';
import { useCallback, useEffect, useRef } from 'react';

const useInfiniteScroll = <T>(
  queryKey: unknown[],
  queryFn: (params: { pageParam: number; size?: number }) => Promise<PaginationMockResponse<T>>,
  enabled: boolean,
) => {
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam, size: 15 }),
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
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.01,
    });

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
