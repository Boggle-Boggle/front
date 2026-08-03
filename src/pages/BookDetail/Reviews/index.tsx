import { useInfiniteQuery } from '@tanstack/react-query';

import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Button, TextButton } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Header } from 'components/Header';
import { IconArrowDown } from 'components/icons';

import { useInfiniteScrollObserver } from 'hooks/useInfiniteScrollObserver';

import { ReviewSortActionSheet } from './SortActionSheet';
import { getBookReviews, REVIEW_SORT_OPTIONS, type ReviewSortType } from '../api';
import { ReviewCard } from '../shared/ReviewCard';

const MSG_REVIEW_PAGE_TITLE = '빼곡한 리뷰';
const MSG_REVIEW_SUBMIT = '등록하기';
const MSG_REVIEW_SPOILER_LABEL = '스포일러가 포함 된 리뷰입니다';
const MSG_REVIEW_TEXTAREA_PLACEHOLDER = '리뷰를 작성해주세요';
const LAYER_ID_BOOK_DETAIL_REVIEW_SORT = 'book-detail-review-sort-bottom-sheet';
const REVIEW_SPOILER_CHECKBOX_ID = 'review-spoiler-checkbox';
const MAX_REVIEW_LENGTH = 700;

export const Reviews = () => {
  const { isbn13 = '' } = useParams();
  const { push } = useLayerStore();

  const [sortType, setSortType] = useState<ReviewSortType>('RECENT');
  const [content, setContent] = useState<string>('');
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['books', isbn13, 'reviews', sortType],
    queryFn: ({ pageParam }) => getBookReviews({ isbn13, page: pageParam, size: 10, sort: sortType }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap((page) => page.reviews).length;
      if (loadedCount < lastPage.totalReviewCount) return allPages.length + 1;

      return undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(isbn13),
  });

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

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value.slice(0, MAX_REVIEW_LENGTH));
  };

  const handleToggleSpoiler = () => {
    setIsSpoiler((prev) => !prev);
  };

  const handleSubmitReview = () => {};

  const handleToggleLike = () => {};

  const reviews = data ? data.pages.flatMap((page) => page.reviews) : [];
  const totalReviewCount = data?.pages[0]?.totalReviewCount || 0;

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
                size="sm"
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

        {totalReviewCount === 0 && !isLoading ? (
          <div className="py-20 text-center text-body2 text-neutral-40">
            아직 등록된 리뷰가 없습니다. 첫 리뷰를 작성해 보세요!
          </div>
        ) : (
          <>
            <ul className="divide-y divide-neutral-20">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} onToggleLike={handleToggleLike} />
              ))}
            </ul>

            <div ref={observerTarget} className="h-4 w-full" />
          </>
        )}
      </div>
    </>
  );
};

export default Reviews;
