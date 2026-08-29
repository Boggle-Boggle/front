import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';
import type { BookReviewItem } from 'pages/BookDetail/api';

import { formatDateTimeToDate } from 'utils/format';

import { ReviewActionSheet } from './ReviewActionSheet';
import { BlockUserConfirmModal } from '../BlockUserConfirmModal';

type ReviewCardProps = {
  review: BookReviewItem;
  onToggleLike?: (reviewId: string) => void;
  isMyReview?: boolean;
};

const MSG_REVIEW_ID_PREFIX = '님';
const MSG_MY_REVIEW = '나의 리뷰';
const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';
const MSG_REVIEW_SPOILER = '스포일러가 포함 된 리뷰입니다.\n리뷰를 보려면 박스를 터치하세요.';
const MSG_READER_LEVEL_DEFAULT = '빼곡 독서가';

export const ReviewCard = (props: ReviewCardProps) => {
  const { review, onToggleLike, isMyReview = false } = props;

  const { id, author, content, likeCount, isSpoiler, isLiked, createdAt } = review;
  const formattedDate = formatDateTimeToDate(createdAt);

  const { push } = useLayerStore();
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/report', { state: { reviewId: id, userId: author.userId } });
  };

  const handleBlockClick = () => {
    push({
      id: `book-detail-review-block-user-modal-${id}`,
      component: <BlockUserConfirmModal userId={author.userId} />,
    });
  };

  const handleOpenActionSheet = () => {
    push({
      id: `book-detail-review-action-sheet-${id}`,
      component: <ReviewActionSheet onReport={handleReportClick} onBlock={handleBlockClick} />,
    });
  };

  const handleLikeClick = () => {
    onToggleLike?.(String(id));
  };

  return (
    <li className="py-mobile text-body1">
      <div className="mb-2 flex items-center gap-1">
        {!isMyReview && (
          <>
            <p className="text-body2 font-bold">{author.nickname}</p>
            <p className="text-body2 font-medium">{MSG_REVIEW_ID_PREFIX}</p>
          </>
        )}
        {isMyReview && <span className="text-body2 font-bold text-primary">{MSG_MY_REVIEW}</span>}
        <p className="text-caption1 text-neutral-60">{MSG_READER_LEVEL_DEFAULT}</p>
      </div>

      {!isSpoiler && <p>{content}</p>}
      {isSpoiler && (
        <div className="bg-neutral-10 whitespace-pre-line rounded-lg border border-dashed border-neutral-40 p-4 text-center text-body2 font-medium text-neutral-40">
          {MSG_REVIEW_SPOILER}
        </div>
      )}

      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-1 text-neutral-60">
          <p className="text-body2 font-medium text-neutral-40">{formattedDate}</p>
          {!isMyReview && (
            <button
              type="button"
              onClick={handleOpenActionSheet}
              className="pl-2 text-body2 font-medium text-neutral-60"
            >
              {MSG_REVIEW_REPORT}/{MSG_REVIEW_BLOCK}
            </button>
          )}
        </div>

        <ToggleButton
          variant="iconCount"
          selected={isLiked}
          onClick={handleLikeClick}
          icon={IconHeart}
          selectedIcon={IconHeartFilled}
          count={likeCount}
          ariaLabel={`좋아요 ${likeCount}`}
        />
      </div>
    </li>
  );
};
