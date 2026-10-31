import { useInfiniteQuery } from '@tanstack/react-query';

import { getBookReviews, type ReviewSortType } from '../api';

const BOOK_REVIEW_PAGE_SIZE = 10;

export const useBookReviewsInfiniteQuery = (itemId: number, sortType: ReviewSortType) => {
  return useInfiniteQuery({
    queryKey: ['books', itemId, 'reviews', sortType],
    queryFn: ({ pageParam }) =>
      getBookReviews({ itemId, page: pageParam, size: BOOK_REVIEW_PAGE_SIZE, sort: sortType }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap((page) => page.reviews).length;
      if (loadedCount < lastPage.totalReviewCount) return allPages.length + 1;

      return undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(itemId),
  });
};
