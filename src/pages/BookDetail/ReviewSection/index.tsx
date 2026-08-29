import { useQuery } from '@tanstack/react-query';

import { useNavigate, useParams } from 'react-router-dom';

import { TextButton } from 'components/Button/TextButton';
import { IconArrowRight } from 'components/icons';

import { getBookReviews } from '../api';
import { ReviewCard } from '../shared/ReviewCard';

const MSG_REVIEW_SUMMARY_PREFIX = '총 ';
const MSG_REVIEW_SUMMARY_SUFFIX = '개의 리뷰가 있습니다.';
const MSG_REVIEW_MORE = '리뷰 더보기';

export const ReviewSection = () => {
  const navigate = useNavigate();
  const { isbn13 = '' } = useParams();

  const { data } = useQuery({
    queryKey: ['books', isbn13, 'reviews', 'summary'],
    queryFn: () => getBookReviews({ isbn13, size: 5 }),
    enabled: Boolean(isbn13),
  });

  const myReview = data?.myReview;
  const reviewsList = data?.reviews || [];
  const previewReviews = myReview ? [myReview, ...reviewsList] : reviewsList;
  const totalReviewCount = data?.totalReviewCount || 0;

  const handleToggleLike = () => {};

  const handleReviewMoreClick = () => navigate(`/books/${isbn13}/reviews`);

  return (
    <section className="pb-safe-bottom pt-7">
      <div className="flex items-center justify-between">
        <p className="text-caption1">
          {MSG_REVIEW_SUMMARY_PREFIX}
          <span className="text-body2">{totalReviewCount}</span>
          {MSG_REVIEW_SUMMARY_SUFFIX}
        </p>

        {/* TODO: 리뷰 더보기 정책 결정 */}
        <TextButton
          onClick={handleReviewMoreClick}
          text={MSG_REVIEW_MORE}
          size="md"
          variant="default"
          rightIcon={IconArrowRight}
        />
      </div>

      {totalReviewCount === 0 ? (
        <div className="py-12 text-center text-body2 text-neutral-40">
          아직 등록된 리뷰가 없습니다. 첫 리뷰를 작성해 보세요!
        </div>
      ) : (
        <ul className="divide-y divide-neutral-20 pt-3">
          {previewReviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                review={review}
                onToggleLike={handleToggleLike}
                isMyReview={review.id === myReview?.id}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};
