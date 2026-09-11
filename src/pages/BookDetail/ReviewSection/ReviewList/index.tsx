import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';
import { IconArrowDown } from 'components/icons';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { ReviewItem } from './ReviewItem';
import { ReviewSortActionSheet } from './SortActionSheet';
import { getBookReviews, likeBookReview, unlikeBookReview, REVIEW_SORT_OPTIONS, type ReviewSortType } from '../../api';

const MSG_REVIEW_PAGE_TITLE = '빼곡한 리뷰';
const MSG_REVIEW_EMPTY = '아직 등록된 리뷰가 없습니다. 첫 리뷰를 작성해 보세요!';
const LAYER_ID_BOOK_DETAIL_REVIEW_SORT = 'book-detail-review-sort-bottom-sheet';

type ReviewListProps = {
  isbn13: string;
};

export const ReviewList = ({ isbn13 }: ReviewListProps) => {
  const { push } = useLayerStore();
  const queryClient = useQueryClient();

  const [sortType, setSortType] = useState<ReviewSortType>('RECENT');

  // 리액트 쿼리 무한 스크롤 조회 연동
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['books', isbn13, 'reviews', sortType],
    queryFn: ({ pageParam }) => getBookReviews({ isbn13, page: pageParam, size: 10, sort: sortType }),
    getNextPageParam: (lastPage, allPages) => {
      const hasMyReview = allPages[0]?.myReview ? 1 : 0;
      const loadedCount = allPages.flatMap((page) => page.reviews).length + hasMyReview;
      if (loadedCount < lastPage.totalReviewCount) return allPages.length + 1;

      return undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(isbn13),
  });

  const myReview = data?.pages[0]?.myReview;
  const reviews = data ? data.pages.flatMap((page) => page.reviews) : [];
  const allReviews = myReview ? [myReview, ...reviews] : reviews;
  const totalReviewCount = data?.pages[0]?.totalReviewCount || 0;

  const { observerTarget } = useInfiniteScrollObserver({
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
    onIntersect: fetchNextPage,
  });

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_REVIEW_SORT,
      component: <ReviewSortActionSheet selectedSort={sortType} onSelectSort={setSortType} />,
    });
  };

  // 리뷰 좋아요 Mutation
  const toggleLikeMutation = useMutation({
    mutationFn: ({ reviewId, isLiked }: { reviewId: string; isLiked: boolean }) =>
      isLiked ? unlikeBookReview(reviewId) : likeBookReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
    },
  });

  const handleToggleLike = (reviewId: string) => {
    const review = allReviews.find((r) => String(r.id) === reviewId);
    if (!review || toggleLikeMutation.isPending) return;

    toggleLikeMutation.mutate({
      reviewId,
      isLiked: review.isLiked,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-20 pb-3 pt-7">
        <p className="text-title4">
          {MSG_REVIEW_PAGE_TITLE} ({totalReviewCount})
        </p>

        <TextButton
          onClick={handleOpenSortLayer}
          text={REVIEW_SORT_OPTIONS[sortType]}
          size="md"
          variant="filled"
          rightIcon={IconArrowDown}
        />
      </div>

      {totalReviewCount === 0 && !isLoading ? (
        <div className="py-20 text-center text-body2 text-neutral-40">
          {MSG_REVIEW_EMPTY}
        </div>
      ) : (
        <>
          <ul className="divide-y divide-neutral-20">
            {allReviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                onToggleLike={handleToggleLike}
                isMyReview={review.id === myReview?.id}
              />
            ))}
          </ul>

          <div ref={observerTarget} className="h-4 w-full" />
        </>
      )}
    </>
  );
};
