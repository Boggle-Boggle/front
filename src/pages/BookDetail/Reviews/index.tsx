import { ChangeEvent, useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { Button, TextButton } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Header } from 'components/Header';
import { IconArrowDown } from 'components/icons';

import { ReviewSortActionSheet, ReviewSortType } from './SortActionSheet';
import { ReviewCard } from '../shared/ReviewCard';
import { BookReview, createMockReviews, CURRENT_REVIEW_USER_ID, MAX_REVIEW_LENGTH } from '../shared/review.mock';

const MSG_REVIEW_PAGE_TITLE = '빼곡한 리뷰';
const MSG_REVIEW_SUBMIT = '등록하기';
const MSG_REVIEW_SPOILER_LABEL = '스포일러가 포함 된 리뷰입니다';
const MSG_REVIEW_TEXTAREA_PLACEHOLDER = '리뷰를 작성해주세요';
const LAYER_ID_BOOK_DETAIL_REVIEW_SORT = 'book-detail-review-sort-bottom-sheet';
const REVIEW_SPOILER_CHECKBOX_ID = 'review-spoiler-checkbox';

const sortLabelByType: Record<ReviewSortType, string> = {
  latest: '최신순',
  oldest: '과거순',
  popular: '인기순',
};

const createDraftReview = (content: string, isSpoiler: boolean): BookReview => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');

  return {
    id: `draft-review-${now.getTime()}`,
    userId: CURRENT_REVIEW_USER_ID,
    nickname: '나의리뷰',
    readerLevel: '1권 독서가',
    content: isSpoiler ? '스포일러가 포함 된 리뷰입니다. 리뷰를 보려면 박스를 터치하세요.' : content.trim(),
    createdAt: `${now.getFullYear()}.${month}.${day}`,
    createdAtTimestamp: now.getTime(),
    likeCount: 0,
    isLiked: false,
    isSpoiler,
  };
};

export const Reviews = () => {
  const [reviews, setReviews] = useState<BookReview[]>(createMockReviews);
  const [sortType, setSortType] = useState<ReviewSortType>('latest');
  const [content, setContent] = useState<string>('');
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);
  const { push } = useLayerStore();

  const sortedReviews = [...reviews].sort((left, right) => {
    if (sortType === 'popular') return right.likeCount - left.likeCount;
    if (sortType === 'oldest') return left.createdAtTimestamp - right.createdAtTimestamp;

    return right.createdAtTimestamp - left.createdAtTimestamp;
  });

  const handleOpenSortLayer = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_REVIEW_SORT,
      component: <ReviewSortActionSheet selectedSort={sortType} onSelectSort={setSortType} />,
    });
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value.slice(0, MAX_REVIEW_LENGTH));
  };

  const handleToggleSpoiler = () => {
    setIsSpoiler((prev) => !prev);
  };

  const handleSubmitReview = () => {
    if (!content.trim()) return;

    setReviews((prev) => [createDraftReview(content, isSpoiler), ...prev]);
    setContent('');
    setIsSpoiler(false);
    setSortType('latest');
  };

  const handleToggleLike = (reviewId: string) => {
    const nextReviews = [...reviews];
    const reviewIndex = nextReviews.findIndex((review) => review.id === reviewId);

    if (reviewIndex < 0) return;

    const targetReview = nextReviews[reviewIndex];
    const nextIsLiked = !targetReview.isLiked;

    nextReviews[reviewIndex] = {
      ...targetReview,
      isLiked: nextIsLiked,
      likeCount: nextIsLiked ? targetReview.likeCount + 1 : Math.max(0, targetReview.likeCount - 1),
    };

    setReviews(nextReviews);
  };

  return (
    <>
      <Header withBack title={MSG_REVIEW_PAGE_TITLE} />

      <div className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        {/* 인풋 */}
        <section className="flex flex-col items-end gap-2">
          <textarea
            value={content}
            onChange={handleChangeContent}
            placeholder={MSG_REVIEW_TEXTAREA_PLACEHOLDER}
            className="h-[5.5rem] w-full resize-none rounded-xl border border-neutral-20 px-4 py-3 text-caption1 outline-primary placeholder:text-neutral-40"
          />

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-0.5">
              <Checkbox
                id={REVIEW_SPOILER_CHECKBOX_ID}
                checked={isSpoiler}
                onChange={handleToggleSpoiler}
                size="mini"
                variant="black"
                className="p-1"
              />
              <label htmlFor={REVIEW_SPOILER_CHECKBOX_ID} className="text-caption1 text-neutral-80">
                {MSG_REVIEW_SPOILER_LABEL}
              </label>
            </div>
            <span className="text-caption1 text-neutral-40">
              {content.length}/{MAX_REVIEW_LENGTH}자
            </span>
          </div>

          <Button
            onClick={handleSubmitReview}
            width="short"
            size="small"
            variant="primary"
            disabled={!content.trim()}
            className="px-5"
          >
            {MSG_REVIEW_SUBMIT}
          </Button>
        </section>

        <div className="flex items-center justify-between border-b border-neutral-20 pb-3 pt-7">
          <p className="text-title4">
            {MSG_REVIEW_PAGE_TITLE} ({reviews.length})
          </p>

          <TextButton
            onClick={handleOpenSortLayer}
            text={sortLabelByType[sortType]}
            size="md"
            variant="filled"
            rightIcon={IconArrowDown}
          />
        </div>

        <ul className="divide-y divide-neutral-20">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onToggleLike={handleToggleLike} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Reviews;
