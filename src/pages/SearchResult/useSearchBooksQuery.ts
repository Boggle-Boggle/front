import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { getSearchBooksMock } from 'services/mock/search';
import { Book } from 'types/book';
import { SearchBookItem, SearchMediaType } from 'types/search';

const SEARCH_BOOKS_PAGE_SIZE = 20;

const toSearchBookItem = (book: Book): SearchBookItem => {
  return {
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    pubDate: book.pubDate,
    cover: book.cover,
  };
};

export const useSearchBooksQuery = (query: string, _type: SearchMediaType) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['books', 'search', query],
    queryFn: ({ pageParam }) => getSearchBooksMock(query, pageParam),
    getNextPageParam: (lastPage) => {
      const totalPageCount = Math.ceil(lastPage.totalResultCnt / lastPage.itemsPerPage);

      if (lastPage.pageNum < totalPageCount) {
        return lastPage.pageNum + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      if (entries[0].isIntersecting && queryResult.hasNextPage && !queryResult.isFetchingNextPage) {
        queryResult.fetchNextPage();
      }
    },
    [queryResult.fetchNextPage, queryResult.hasNextPage, queryResult.isFetchingNextPage],
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

  const data = queryResult.data
    ? {
        pages: queryResult.data.pages.map((page) => ({
          items: page.items.map(toSearchBookItem),
          total: page.totalResultCnt,
        })),
      }
    : undefined;

  return {
    data,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    isLoading: queryResult.isLoading,
    observerTarget,
  };
};
