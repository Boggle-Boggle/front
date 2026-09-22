import { useInfiniteQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import { Header } from 'components/Header';
import { InfiniteScrollTrigger } from 'components/InfiniteScrollTrigger';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';
import Loading from 'pages/Loading';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';
import { formatToDotDate } from 'utils/date';

import { getMyReviews, type MyReviewItem } from '../api';

const MSG_MY_REVIEWS_TITLE = '내가 작성한 리뷰';
const MSG_MY_REVIEWS_EMPTY = '작성한 리뷰가 없습니다.';
const MSG_MY_REVIEWS_UNKNOWN_BOOK = '알 수 없는 도서';
const MSG_MY_REVIEWS_EDITED = '(수정됨)';
const MSG_MY_REVIEWS_SPOILER = '스포일러 포함';
const MSG_MY_REVIEWS_BLINDED = '블라인드 처리됨';
const MY_REVIEWS_PAGE_SIZE = 20;

const MyReviewListItem = ({ review }: { review: MyReviewItem }) => {
  const title = review.book.title ?? MSG_MY_REVIEWS_UNKNOWN_BOOK;
  const isEdited = review.createdAt !== review.updatedAt;

  const handleLikeClick = () => {};

  return (
    <li className="border-b border-neutral-20 px-mobile py-4 last:border-b-0">
      <Link to={`/books/${review.book.isbn13}`} className="block">
        <p className="line-clamp-1 text-title4 text-neutral-80">{title}</p>
      </Link>

      <div className="flex items-center gap-0.5 pt-2 text-caption1 text-neutral-40">
        <span>{formatToDotDate(review.createdAt)}</span>
        {isEdited && <span>{MSG_MY_REVIEWS_EDITED}</span>}
      </div>

      <p className="mt-1 line-clamp-6 whitespace-pre-wrap break-words text-body2 text-neutral-100">
        {review.content}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-wrap gap-2 text-caption1 text-neutral-60">
          {review.isSpoiler && <span>{MSG_MY_REVIEWS_SPOILER}</span>}
          {review.isBlinded && <span className="text-danger">{MSG_MY_REVIEWS_BLINDED}</span>}
        </div>
        <ToggleButton
          variant="iconCount"
          selected={false}
          onClick={handleLikeClick}
          icon={IconHeart}
          selectedIcon={IconHeartFilled}
          count={review.likeCount}
          ariaLabel={`좋아요 ${review.likeCount}`}
        />
      </div>
    </li>
  );
};

const MyReviews = () => {
  const queryResult = useInfiniteQuery({
    queryKey: ['reviews', 'me'],
    queryFn: ({ pageParam }) => getMyReviews({ page: pageParam, size: MY_REVIEWS_PAGE_SIZE }),
    getNextPageParam: (lastPage) => {
      const { page, size, total } = lastPage.meta.page;

      if (page < Math.ceil(total / size)) return page + 1;

      return undefined;
    },
    initialPageParam: 1,
  });

  const { observerTarget } = useInfiniteScrollObserver({
    enabled: Boolean(queryResult.hasNextPage && !queryResult.isFetchingNextPage),
    onIntersect: queryResult.fetchNextPage,
  });

  if (queryResult.isLoading) return <Loading />;

  const reviews = queryResult.data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_MY_REVIEWS_TITLE} withBack />

      {reviews.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-body2 text-neutral-60">{MSG_MY_REVIEWS_EMPTY}</div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
          <ul>
            {reviews.map((review) => (
              <MyReviewListItem key={review.reviewId} review={review} />
            ))}
          </ul>
          <InfiniteScrollTrigger
            observerTarget={observerTarget}
            hasNextPage={queryResult.hasNextPage}
            isFetching={queryResult.isFetchingNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default MyReviews;
