import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ChangeEvent, useState } from 'react';

import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';

import { createBookReview } from '../../api';

const MSG_REVIEW_SUBMIT = '등록하기';
const MSG_REVIEW_SPOILER_LABEL = '스포일러가 포함됨';
const MSG_REVIEW_TEXTAREA_PLACEHOLDER = '리뷰를 남겨 주세요. 최대 700자까지 작성할 수 있어요.';
const REVIEW_SPOILER_CHECKBOX_ID = 'review-spoiler-checkbox';
const MAX_REVIEW_LENGTH = 700;

type ReviewInputProps = {
  isbn13: string;
};

export const ReviewInput = ({ isbn13 }: ReviewInputProps) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>('');
  const [isSpoilerChecked, setIsSpoilerChecked] = useState<boolean>(false);

  const createReviewMutation = useMutation({
    mutationFn: createBookReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      setContent('');
      setIsSpoilerChecked(false);
    },
  });

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value.slice(0, MAX_REVIEW_LENGTH));
  };

  const handleToggleSpoiler = () => {
    setIsSpoilerChecked((prev) => !prev);
  };

  const handleSubmitReview = () => {
    if (!content.trim() || createReviewMutation.isPending) return;

    createReviewMutation.mutate({
      isbn13,
      content: content.trim(),
      isSpoiler: isSpoilerChecked,
    });
  };

  return (
    <section className="mt-4 flex w-full flex-col gap-6 rounded-[4px] border border-neutral-20 p-3 outline-primary">
      <textarea
        value={content}
        onChange={handleChangeContent}
        placeholder={MSG_REVIEW_TEXTAREA_PLACEHOLDER}
        className="h-[5.5rem] w-full resize-none text-caption1 outline-none placeholder:text-neutral-40"
      />

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-0.5">
          <Checkbox
            id={REVIEW_SPOILER_CHECKBOX_ID}
            checked={isSpoilerChecked}
            onChange={handleToggleSpoiler}
            size="sm"
            variant="black"
            className="p-1"
          />
          <label htmlFor={REVIEW_SPOILER_CHECKBOX_ID} className="cursor-pointer text-caption1 text-neutral-80">
            {MSG_REVIEW_SPOILER_LABEL}
          </label>
        </div>

        <Button
          onClick={handleSubmitReview}
          width="short"
          size="small"
          variant="primary"
          disabled={!content.trim() || createReviewMutation.isPending}
          className="px-5"
        >
          {MSG_REVIEW_SUBMIT}
        </Button>
      </div>
    </section>
  );
};
