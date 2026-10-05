import { useInfiniteQuery } from '@tanstack/react-query';

import { getBookReviews, type ReviewSortType } from '../api';

const BOOK_REVIEW_PAGE_SIZE = 10;

export const useBookReviewsInfiniteQuery = (isbn13: string, sortType: ReviewSortType) => {
  return useInfiniteQuery({
    queryKey: ['books', isbn13, 'reviews', sortType],
    queryFn: ({ pageParam }) =>
      getBookReviews({ isbn13, page: pageParam, size: BOOK_REVIEW_PAGE_SIZE, sort: sortType }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap((page) => page.reviews).length;
      if (loadedCount < lastPage.totalReviewCount) return allPages.length + 1;

      return undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(isbn13),
  });
};
