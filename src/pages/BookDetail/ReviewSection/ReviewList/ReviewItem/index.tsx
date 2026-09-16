import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { TextButton } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Input } from 'components/Input';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';
import { editBookReview, type BookReviewItem } from 'pages/BookDetail/api';

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
const MSG_REVIEW_EDITED = '(수정됨)';
const MSG_MY_REVIEW_OPTIONS = '수정/삭제';
const MSG_REVIEW_EDIT_SAVE = '저장';
const MSG_REVIEW_EDIT_CANCEL = '취소';
const MSG_REVIEW_EDIT_SPOILER_LABEL = '스포일러';
const MSG_REVIEW_EDIT_SUCCESS_TOAST = '리뷰가 성공적으로 수정되었어요.';
const MSG_REVIEW_EDIT_FAILED_TOAST = '리뷰 수정에 실패했습니다.';
const MSG_REVIEW_EDIT_PLACEHOLDER = '리뷰를 수정해 주세요.';
const MAX_REVIEW_LENGTH = 700;

export const ReviewItem = (props: ReviewItemProps) => {
  const { review, onToggleLike, isMyReview = false } = props;
  const [isOpenSpoiler, setIsOpenSpoiler] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(review.content);
  const [editIsSpoiler, setEditIsSpoiler] = useState<boolean>(review.isSpoiler);

  const { id, author, content, likeCount, isSpoiler, isLiked, createdAt } = review;
  const { push } = useLayerStore();
  const { addToast } = useToastStore();
  const { isbn13 = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formattedDate = formatToDotDate(createdAt);
  const readBookCount = author.readBookCount ?? author.totalReadCount ?? 0;
  const userLevel = readBookCount > 0 ? `${readBookCount}${MSG_USER_LEVEL_SUFFIX}` : MSG_USER_LEVEL_DEFAULT;
  const isEdited = review.createdAt !== review.updatedAt;

  const editBookReviewMutation = useMutation({
    mutationFn: editBookReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      setIsEditing(false);
      addToast({ description: MSG_REVIEW_EDIT_SUCCESS_TOAST, type: 'success' });
    },
    onError: () => {
      addToast({ description: MSG_REVIEW_EDIT_FAILED_TOAST, type: 'error' });
    },
  });
  const spoilerCheckboxId = `review-edit-spoiler-checkbox-${id}`;
  const isEditSubmitDisabled = !editContent.trim() || editBookReviewMutation.isPending;

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
    setEditContent(content);
    setEditIsSpoiler(isSpoiler);
    setIsOpenSpoiler(true);
    setIsEditing(true);
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

  const handleChangeEditContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditContent(event.target.value.slice(0, MAX_REVIEW_LENGTH));
  };

  const handleClearEditContent = () => {
    setEditContent('');
  };

  const handleToggleEditSpoiler = () => {
    setEditIsSpoiler((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setEditContent(content);
    setEditIsSpoiler(isSpoiler);
    setIsEditing(false);
  };

  const handleSubmitEdit = () => {
    if (isEditSubmitDisabled) return;

    editBookReviewMutation.mutate({
      reviewId: String(id),
      content: editContent.trim(),
      isSpoiler: editIsSpoiler,
    });
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

        <p className="text-caption1 text-neutral-40">
          {formattedDate} {isEdited && MSG_REVIEW_EDITED}
        </p>
      </div>

      {/* 본문 */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Input
            appearance="line"
            value={editContent}
            onChange={handleChangeEditContent}
            onClear={handleClearEditContent}
            placeholder={MSG_REVIEW_EDIT_PLACEHOLDER}
            maxLength={MAX_REVIEW_LENGTH}
            state={editBookReviewMutation.isPending ? 'disabled' : 'default'}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Checkbox
                id={spoilerCheckboxId}
                checked={editIsSpoiler}
                onChange={handleToggleEditSpoiler}
                size="sm"
                disabled={editBookReviewMutation.isPending}
              />
              <label htmlFor={spoilerCheckboxId} className="cursor-pointer text-caption1 text-neutral-60">
                {MSG_REVIEW_EDIT_SPOILER_LABEL}
              </label>
            </div>

            <div className="flex items-center gap-1">
              <TextButton
                text={MSG_REVIEW_EDIT_CANCEL}
                size="sm"
                onClick={handleCancelEdit}
                disabled={editBookReviewMutation.isPending}
              />
              <TextButton
                text={MSG_REVIEW_EDIT_SAVE}
                size="sm"
                variant="primaryLine"
                onClick={handleSubmitEdit}
                disabled={isEditSubmitDisabled}
              />
            </div>
          </div>
        </div>
      ) : !isSpoiler || isOpenSpoiler ? (
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
        {isEditing ? (
          <span />
        ) : isMyReview ? (
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
