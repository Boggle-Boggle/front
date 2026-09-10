import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';
import type { BookReviewItem } from 'pages/BookDetail/api';

import { formatToDotDate } from 'utils/date';

import { ReviewActionSheet } from './ReviewActionSheet';
import { BlockUserConfirmModal } from '../BlockUserConfirmModal';

type ReviewCardProps = {
  review: BookReviewItem;
  onToggleLike: (reviewId: string) => void;
  isMyReview: boolean;
};

const MSG_REVIEW_ID_PREFIX = '님';
const MSG_MY_REVIEW = '나의 리뷰';
const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';
const MSG_REVIEW_SPOILER = '스포일러가 포함 된 리뷰입니다.\n리뷰를 보려면 박스를 터치하세요.';
const MSG_READER_LEVEL_DEFAULT = '빼곡 독서가';
const MSG_READER_LEVEL_SUFFIX = '권 독서가';

export const ReviewCard = (props: ReviewCardProps) => {
  const { review, onToggleLike, isMyReview = false } = props;
  const [isOpenSpoiler, setIsOpenSpoiler] = useState<boolean>(false);

  const { id, author, content, likeCount, isSpoiler, isLiked, createdAt } = review;
  const { push } = useLayerStore();
  const navigate = useNavigate();

  const formattedDate = formatToDotDate(createdAt);
  const readBookCount = author.readBookCount ?? author.totalReadCount ?? 0;
  // TODO: 변수명 이상한데 수정필요
  const readerLevel = readBookCount > 0 ? `${readBookCount}${MSG_READER_LEVEL_SUFFIX}` : MSG_READER_LEVEL_DEFAULT;
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
        {/* TODO: 아래 div 박스 두줄로 나옴 수정 필요 */}
        <div className="inline">
          {isMyReview ? (
            <span className="text-primary">{MSG_MY_REVIEW}</span>
          ) : (
            <div>
              {author.nickname}
              {MSG_REVIEW_ID_PREFIX}
            </div>
          )}
          <p className="text-caption1 font-medium text-neutral-40">{readerLevel}</p>
        </div>

        <p className="text-caption1 font-medium text-neutral-40">
          {/* TODO: 수정됨 다국어 처리 */}
          {formattedDate} {isEdited ?? '수정됨'}
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
      <div className="mt-3 flex items-center justify-between">
        {isMyReview ? (
          // TODO: 내 리뷰일 경유 UI 및 액션 연결
          <button type="button" onClick={handleOpenActionSheet} className="cursor-pointer text-neutral-60">
            {MSG_REVIEW_REPORT}/{MSG_REVIEW_BLOCK}
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
