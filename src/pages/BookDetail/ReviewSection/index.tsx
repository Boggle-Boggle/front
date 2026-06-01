import { useNavigate, useParams } from 'react-router-dom';

import { TextButton } from 'components/Button/TextButton';
import { IconArrowRight } from 'components/icons';

import { ReviewCard } from './ReviewCard';
import { REVIEW_PREVIEW_COUNT, createMockReviews } from '../shared/review.mock';

const MSG_REVIEW_SUMMARY_PREFIX = '총 ';
const MSG_REVIEW_SUMMARY_SUFFIX = '개의 리뷰가 있습니다.';
const MSG_REVIEW_MORE = '리뷰 더보기';

export const ReviewSection = () => {
  const navigate = useNavigate();
  const { detailId = '' } = useParams();

  const reviews = createMockReviews();
  const previewReviews = reviews.slice(0, REVIEW_PREVIEW_COUNT);
  const totalReviewCount = reviews.length;

  const handleToggleLike = () => {};

  const handleReviewMoreClick = () => navigate(`/detail/${detailId}/reviews`);

  return (
    <section className="pb-safe-bottom pt-7">
      <div className="flex items-center justify-between">
        <p className="text-caption1">
          {MSG_REVIEW_SUMMARY_PREFIX}
          <span className="text-body2">{totalReviewCount}</span>
          {MSG_REVIEW_SUMMARY_SUFFIX}
        </p>

        <TextButton
          onClick={handleReviewMoreClick}
          text={MSG_REVIEW_MORE}
          size="md"
          variant="default"
          rightIcon={IconArrowRight}
        />
      </div>

      <ul className="divide-y divide-neutral-20 pt-3">
        {previewReviews.map((review) => {
          return <ReviewCard key={review.id} review={review} onToggleLike={handleToggleLike} />;
        })}
      </ul>
    </section>
  );
};
