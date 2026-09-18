import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

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
const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';
const MSG_REVIEW_SPOILER = '스포일러가 포함 된 리뷰입니다.\n리뷰를 보려면 박스를 터치하세요.';
const MSG_USER_LEVEL_DEFAULT = '빼곡 독서가';
const MSG_USER_LEVEL_SUFFIX = '권 독서가';
const MSG_MY_REVIEW_OPTIONS = '삭제';

export const ReviewItem = (props: ReviewItemProps) => {
  const { review, onToggleLike, isMyReview = false } = props;
  const [isOpenSpoiler, setIsOpenSpoiler] = useState<boolean>(false);

  const { id, author, content, likeCount, isSpoiler, isLiked, createdAt } = review;
  const { push } = useLayerStore();
  const navigate = useNavigate();

  const formattedDate = formatToDotDate(createdAt);
  const readBookCount = author.readBookCount ?? author.totalReadCount ?? 0;
  const userLevel = readBookCount > 0 ? `${readBookCount}${MSG_USER_LEVEL_SUFFIX}` : MSG_USER_LEVEL_DEFAULT;
  const shouldShowContent = !isSpoiler || isOpenSpoiler;

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

  const handleDeleteClick = () => {
    push({
      id: `book-detail-review-delete-modal-${id}`,
      component: <DeleteReviewConfirmModal reviewId={String(id)} />,
    });
  };

  const handleOpenMyReviewActionSheet = () => {
    push({
      id: `book-detail-review-my-action-sheet-${id}`,
      component: <MyReviewActionSheet onDelete={handleDeleteClick} />,
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
          <span className={isMyReview ? 'text-primary' : ''}>
            {author.nickname}
            <span>{MSG_REVIEW_ID_PREFIX}</span>
          </span>
          <span className="pl-1 text-caption1 text-neutral-40">{userLevel}</span>
        </div>

        <p className="text-caption1 text-neutral-40">{formattedDate}</p>
      </div>

      {/* 본문 */}
      {!isSpoiler ? (
        <p className="whitespace-pre-wrap break-words text-body1">{content}</p>
      ) : (
        <div className="grid transition-all duration-300">
          <p
            className={`col-start-1 row-start-1 whitespace-pre-wrap break-words text-body1 transition-opacity duration-300 ${
              shouldShowContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {content}
          </p>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsOpenSpoiler(true)}
            onKeyDown={handleKeyDownSpoiler}
            className={`col-start-1 row-start-1 flex cursor-pointer items-center justify-center overflow-hidden whitespace-pre-line rounded-lg border border-dashed bg-neutral-0 text-center text-caption1 text-neutral-40 transition-all duration-300 ${
              shouldShowContent
                ? 'pointer-events-none max-h-0 scale-95 border-transparent p-0 opacity-0'
                : 'max-h-40 min-h-[5.5rem] scale-100 border-neutral-40 p-4 opacity-100'
            }`}
          >
            {MSG_REVIEW_SPOILER}
          </div>
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
