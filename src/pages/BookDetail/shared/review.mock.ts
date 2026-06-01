export const CURRENT_REVIEW_USER_ID = 'mock-current-user';
export const MAX_REVIEW_LENGTH = 700;
export const REVIEW_PREVIEW_COUNT = 5;

export type BookReview = {
  id: string;
  userId: string;
  nickname: string;
  readerLevel: string;
  content: string;
  createdAt: string;
  createdAtTimestamp: number;
  likeCount: number;
  isLiked: boolean;
  isSpoiler: boolean;
};

const MOCK_REVIEW_CONTENTS = [
  '미술을 알고 싶어하는 이들을 위한 입문서로 꽤 만족스러웠어요. 어렵지 않은 문장으로 풀어내서 부담이 적었습니다.',
  '전시를 보는 기준을 알려주는 느낌이라 좋았습니다. 작품 설명보다 감상 태도에 더 집중하는 점이 특히 인상적이었어요.',
  '예시가 많아서 금방 읽히고, 중간중간 시선을 환기시키는 문장이 있어 끝까지 지루하지 않았습니다.',
  '처음엔 가볍게 펼쳤는데 생각보다 오래 남는 문장이 많았습니다. 미술관 가기 전에 읽으면 더 좋을 것 같아요.',
  '설명이 친절하고 흐름이 부드러워서 입문자에게 적합합니다. 난이도가 높지 않아 추천하기 쉬운 책입니다.',
  '개인적으로는 후반부 챕터가 더 좋았어요. 앞부분보다 시야가 넓어지는 느낌이 있었고 다시 읽고 싶어졌습니다.',
  '짧은 호흡으로 읽히지만 생각거리는 꽤 많았습니다. 메모해두고 싶은 문장이 몇 개 있었어요.',
  '감상문처럼 읽히는 부분이 많아서 딱딱하지 않았습니다. 미술을 잘 모르는 사람도 자연스럽게 따라갈 수 있어요.',
  '책이 친절하긴 하지만 너무 가볍지는 않아서 좋았습니다. 입문서와 교양서의 중간쯤 되는 느낌입니다.',
  '읽고 나서 실제 전시를 보고 싶다는 생각이 들었어요. 책이 행동으로 이어지게 만드는 힘이 있었습니다.',
];

const MOCK_REVIEW_NICKNAMES = [
  '칸데르니아',
  '노을빛',
  '은빛달',
  '헤징',
  '빛의전사',
  '푸른서가',
  '종이파도',
  '책등고양이',
];

const formatReviewDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const createMockReviews = (): BookReview[] => {
  return Array.from({ length: 100 }, (_, index) => {
    const reviewDate = new Date('2026-05-30T09:00:00');
    reviewDate.setDate(reviewDate.getDate() - index);
    const userId = index % 8 === 0 ? CURRENT_REVIEW_USER_ID : `mock-user-${index + 1}`;
    const isSpoiler = index % 6 === 0;
    const content = isSpoiler
      ? '스포일러가 포함 된 리뷰입니다. 리뷰를 보려면 박스를 터치하세요.'
      : MOCK_REVIEW_CONTENTS[index % MOCK_REVIEW_CONTENTS.length];

    return {
      id: `review-${index + 1}`,
      userId,
      nickname:
        userId === CURRENT_REVIEW_USER_ID ? '나의리뷰' : MOCK_REVIEW_NICKNAMES[index % MOCK_REVIEW_NICKNAMES.length],
      readerLevel: `${(index % 3) + 1}권 독서가`,
      content,
      createdAt: formatReviewDate(reviewDate),
      createdAtTimestamp: reviewDate.getTime(),
      likeCount: 3 + ((index * 7) % 31),
      isLiked: index % 5 === 0,
      isSpoiler,
    };
  });
};
