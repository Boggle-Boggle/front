import { TextButton } from 'components/Button/TextButton';
import { IconArrowRight } from 'components/icons';

import { ReviewCard, ReviewItem } from './ReviewCard';

const MSG_REVIEW_SUMMARY_PREFIX = '총 ';
const MSG_REVIEW_SUMMARY_SUFFIX = '개의 리뷰가 있습니다.';
const MSG_REVIEW_MORE = '리뷰 더보기';

const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    nickname: '칸데르니아',
    readerLevel: '1회독 독서가',
    content:
      '전문가가 아닌 관람자의 시선으로 미술을 대하는 법을 알려주는 책이에요. 도슨트의 설명을 따라가듯이 구성되어 있어서 읽는 동안 미술관을 걷는 느낌도 들고요. 작가나 시대 배경 같은 정보보다도 어떻게 보면 좋을지를 알려줘서 더 인상 깊었어요. 미술 초보에게 특히 추천하고 싶어요.',
    createdAt: '2025.04.14',
    likeCount: 12,
  },
  {
    id: 'review-2',
    nickname: '노을빛',
    readerLevel: '1회독 독서가',
    content:
      '친절하고 차분한 어조로 미술관이라는 공간을 해석해주는 책이에요. 예술작품을 감상하는 데 정답은 없다는 말이 큰 위안이 됐어요. 작품에 대한 설명보다, 관람하는 사람의 시선에 집중한 점이 특히 좋았고요. 미술관을 좋아하지만 어색했던 분들에게 꼭 추천하고 싶어요.',
    createdAt: '2025.04.14',
    likeCount: 6,
  },
  {
    id: 'review-3',
    nickname: '은빛달',
    readerLevel: '1회독 독서가',
    content: '강의가 체계적으로 잘 정리되어 있어서 이해하기 쉬웠어요!',
    createdAt: '2025.04.14',
    likeCount: 5,
  },
  {
    id: 'review-4',
    nickname: '헤징',
    readerLevel: '1회독 독서가',
    content: '강사님이 질문에 친절하게 답해주셔서 좋았습니다.',
    createdAt: '2025.04.14',
    likeCount: 4,
  },
  {
    id: 'review-5',
    nickname: '빛의전사',
    readerLevel: '1회독 독서가',
    content: '미술 전시회의 작품들이 다 개성 있고 멋졌어요.',
    createdAt: '2025.04.14',
    likeCount: 2,
  },
];

export const ReviewSection = () => {
  const totalReviewCount = MOCK_REVIEWS.length;

  const handleReviewMoreClick = () => {};

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
        {MOCK_REVIEWS.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </ul>
    </section>
  );
};
