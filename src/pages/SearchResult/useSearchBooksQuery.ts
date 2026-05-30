import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { getBooksSearch } from 'services/books';
import { BookSearchItemResponse, SearchBookItem, SearchMediaType } from 'types/search';

const SEARCH_BOOKS_PAGE_SIZE = 20;

const toSearchBookItem = (book: BookSearchItemResponse): SearchBookItem => {
  return {
    isbn: book.isbn13,
    title: book.title,
    author: book.author,
    publisher: book.publisher ?? '',
    pubDate: book.publishedDate ?? '',
    cover: book.coverUrl ?? '',
  };
};

export const useSearchBooksQuery = (query: string, type: SearchMediaType) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['books', 'search', query, type],
    queryFn: ({ pageParam }) =>
      getBooksSearch({
        query,
        type,
        page: pageParam,
        size: SEARCH_BOOKS_PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => {
      const page = lastPage.meta.page;

      if (!page) {
        return undefined;
      }

      const totalPageCount = Math.ceil(page.total / page.size);

      if (page.page < totalPageCount) {
        return page.page + 1;
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
          items: page.data?.map(toSearchBookItem) ?? [],
          total: page.meta.page?.total ?? 0,
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
