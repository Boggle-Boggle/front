import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { TextButton } from 'components/Button';
import { Empty } from 'components/Empty';
import { InfiniteScrollTrigger } from 'components/InfiniteScrollTrigger';
import { IconArrowDown } from 'components/icons';
import { useBookReviewsInfiniteQuery } from 'pages/BookDetail/queries/useBookReviewsInfiniteQuery';
import { useToggleBookReviewLikeMutation } from 'pages/BookDetail/queries/useToggleBookReviewLikeMutation';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { ReviewItem } from './ReviewItem';
import { ReviewSortActionSheet } from './SortActionSheet';
import { REVIEW_SORT_OPTIONS, type ReviewSortType } from '../../api';

const MSG_REVIEW_PAGE_TITLE = '빼곡한 리뷰';
const MSG_REVIEW_EMPTY = '아직 작성된 리뷰가 없어요';
const MSG_REVIEW_MY_LIKE_FORBIDDEN = '자기가 쓴 리뷰에는 좋아요를 누를 수 없어요.';
const LAYER_ID_BOOK_DETAIL_REVIEW_SORT = 'book-detail-review-sort-bottom-sheet';

type ReviewListProps = {
  isbn13: string;
};

export const ReviewList = ({ isbn13 }: ReviewListProps) => {
  const { push } = useLayerStore();
  const { addToast } = useToastStore();
  const [sortType, setSortType] = useState<ReviewSortType>('RECENT');

  const {
    data: bookReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBookReviewsLoading,
  } = useBookReviewsInfiniteQuery(isbn13, sortType);
  const toggleBookReviewLikeMutation = useToggleBookReviewLikeMutation(isbn13);

  const allReviews = bookReviews ? bookReviews.pages.flatMap((page) => page.reviews) : [];
  const totalReviewCount = bookReviews?.pages[0]?.totalReviewCount || 0;

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

  const handleToggleLike = (reviewId: string) => {
    const review = allReviews.find((r) => String(r.id) === reviewId);
    if (!review || toggleBookReviewLikeMutation.isPending) return;

    if (review.isMine) {
      addToast({ description: MSG_REVIEW_MY_LIKE_FORBIDDEN, type: 'error' });
      return;
    }

    toggleBookReviewLikeMutation.mutate({
      reviewId,
      isLiked: review.isLiked,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3 pt-7">
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

      {totalReviewCount === 0 && !isBookReviewsLoading ? (
        <Empty text={MSG_REVIEW_EMPTY} />
      ) : (
        <>
          <ul className="divide-y divide-neutral-20">
            {allReviews.map((review) => (
              <ReviewItem key={review.id} review={review} onToggleLike={handleToggleLike} isMyReview={review.isMine} />
            ))}
          </ul>

          <InfiniteScrollTrigger
            observerTarget={observerTarget}
            hasNextPage={hasNextPage}
            isFetching={isFetchingNextPage}
          />
        </>
      )}
    </>
  );
};
