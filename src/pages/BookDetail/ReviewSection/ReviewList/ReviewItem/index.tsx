import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';
import type { BookReviewItem } from 'pages/BookDetail/api';

import { formatToDotDate } from 'utils/date';

import { BlockUserConfirmModal } from './BlockUserConfirmModal';
import { DeleteReviewConfirmModal } from './DeleteReviewConfirmModal';
import { MyReviewActionSheet } from './MyReviewActionSheet';
import { ReviewActionSheet } from './ReviewActionSheet';

type ReviewItemProps = {
  review: BookReviewItem;
  onToggleLike: (reviewId: string) => void;
  isMyReview: boolean;
};

const MSG_REVIEW_ID_PREFIX = '님';
const MSG_MY_REVIEW = '나의 리뷰';
const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';
const MSG_REVIEW_SPOILER = '스포일러가 포함 된 리뷰입니다.\n리뷰를 보려면 박스를 터치하세요.';
const MSG_USER_LEVEL_DEFAULT = '빼곡 독서가';
const MSG_USER_LEVEL_SUFFIX = '권 독서가';
const MSG_REVIEW_EDITED = '(수정됨)';
const MSG_MY_REVIEW_OPTIONS = '수정/삭제';

export const ReviewItem = (props: ReviewItemProps) => {
  const { review, onToggleLike, isMyReview = false } = props;
  const [isOpenSpoiler, setIsOpenSpoiler] = useState<boolean>(false);

  const { id, author, content, likeCount, isSpoiler, isLiked, createdAt } = review;
  const { push } = useLayerStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const formattedDate = formatToDotDate(createdAt);
  const readBookCount = author.readBookCount ?? author.totalReadCount ?? 0;
  const userLevel = readBookCount > 0 ? `${readBookCount}${MSG_USER_LEVEL_SUFFIX}` : MSG_USER_LEVEL_DEFAULT;
  const isEdited = review.createdAt !== review.updatedAt;

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

  const handleEditClick = () => {
    addToast({
      description: '리뷰 수정 기능은 준비 중입니다.',
      type: 'error',
    });
  };

  const handleDeleteClick = () => {
    push({
      id: `book-detail-review-delete-modal-${id}`,
      component: <DeleteReviewConfirmModal reviewId={String(id)} />,
    });
  };

  const handleOpenMyReviewActionSheet = () => {
    push({
      id: `book-detail-review-my-action-sheet-${id}`,
      component: <MyReviewActionSheet onEdit={handleEditClick} onDelete={handleDeleteClick} />,
    });
  };

  const handleLikeClick = () => {
    onToggleLike?.(String(id));
  };

  const handleKeyDownSpoiler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpenSpoiler(true);
    }
  };

  return (
    <li className="py-mobile text-body2">
      {/* 프로필 */}
      <div className="mb-2 flex w-full items-start justify-between">
        <div>
          {isMyReview ? (
            <span className="text-primary">{MSG_MY_REVIEW}</span>
          ) : (
            <span>
              {author.nickname}
              <span>{MSG_REVIEW_ID_PREFIX}</span>
            </span>
          )}
          <span className="pl-1 text-caption1 text-neutral-40">{userLevel}</span>
        </div>

        <p className="text-caption1 text-neutral-40">
          {formattedDate} {isEdited && MSG_REVIEW_EDITED}
        </p>
      </div>

      {/* 본문 */}
      {!isSpoiler || isOpenSpoiler ? (
        <p className="text-body1">{content}</p>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpenSpoiler(true)}
          onKeyDown={handleKeyDownSpoiler}
          className="cursor-pointer whitespace-pre-line rounded-lg border border-dashed border-neutral-40 p-4 text-center text-caption1 text-neutral-40"
        >
          {MSG_REVIEW_SPOILER}
        </div>
      )}

      {/* 바텀영역 */}
      <div className="mt-3 flex items-center justify-between text-caption1">
        {isMyReview ? (
          <button type="button" onClick={handleOpenMyReviewActionSheet} className="cursor-pointer text-primary">
            {MSG_MY_REVIEW_OPTIONS}
          </button>
        ) : (
          <button type="button" onClick={handleOpenActionSheet} className="cursor-pointer text-neutral-60">
            {MSG_REVIEW_REPORT}/{MSG_REVIEW_BLOCK}
          </button>
        )}

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
