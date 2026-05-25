import { useLayerStore } from 'stores/useLayerStore';

import { ActionSheet } from 'components/Layer/ActionSheet';
import { IconHeart } from 'components/icons';

type ReviewItem = {
  id: string;
  nickname: string;
  readerLevel: string;
  content: string;
  createdAt: string;
  likeCount: number;
};

type ReviewCardProps = {
  review: ReviewItem;
};

const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';
const MSG_REVIEW_ID_PREFIX = '님';
const MSG_REVIEW_ACTION_TRIGGER = '신고/차단';

export const ReviewCard = (props: ReviewCardProps) => {
  const { review } = props;
  const { id, nickname, readerLevel, content, createdAt, likeCount } = review;
  const { push } = useLayerStore();

  const handleReportClick = () => {};

  const handleBlockClick = () => {};

  const handleReviewActionClick = () => {
    push({
      id: `review-action-sheet-${id}`,
      type: 'BOTTOM_SHEET',
      component: (
        <ActionSheet
          items={[
            {
              key: 'report',
              label: MSG_REVIEW_REPORT,
              onSelect: handleReportClick,
            },
            {
              key: 'block',
              label: MSG_REVIEW_BLOCK,
              onSelect: handleBlockClick,
            },
          ]}
        />
      ),
    });
  };

  const handleLikeClick = () => {};

  return (
    <li className="py-4">
      <div className="flex items-center gap-1">
        <p className="text-body2">{nickname}</p>
        <p className="text-caption1">{MSG_REVIEW_ID_PREFIX}</p>
        <p className="text-caption1 text-neutral-60">{readerLevel}</p>
      </div>

      <p className="pt-2 text-body1">{content}</p>

      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-1 text-neutral-60">
          <p className="text-caption1 text-neutral-40">{createdAt}</p>
          <button type="button" onClick={handleReviewActionClick} className="text-caption1 text-neutral-60">
            {MSG_REVIEW_ACTION_TRIGGER}
          </button>
        </div>

        <button
          type="button"
          onClick={handleLikeClick}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-20 px-2 py-1"
        >
          <IconHeart className="size-icon-sm text-neutral-100" />
          <span className="text-body2 text-neutral-100">{likeCount}</span>
        </button>
      </div>
    </li>
  );
};

export type { ReviewItem };
