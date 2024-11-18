import { useState } from 'react';

// TODO : 이미지최적화
import emptyStar1 from 'assets/stars/empty/star1.png';
import emptyStar2 from 'assets/stars/empty/star2.png';
import emptyStar3 from 'assets/stars/empty/star3.png';
import emptyStar4 from 'assets/stars/empty/star4.png';
import emptyStar5 from 'assets/stars/empty/star5.png';

import halfStar1 from 'assets/stars/half/star1.png';
import halfStar2 from 'assets/stars/half/star2.png';
import halfStar3 from 'assets/stars/half/star3.png';
import halfStar4 from 'assets/stars/half/star4.png';
import halfStar5 from 'assets/stars/half/star5.png';

import filledStar1 from 'assets/stars/filled/star1.png';
import filledStar2 from 'assets/stars/filled/star2.png';
import filledStar3 from 'assets/stars/filled/star3.png';
import filledStar4 from 'assets/stars/filled/star4.png';
import filledStar5 from 'assets/stars/filled/star5.png';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';
import ButtonSet from './shared/ButtonSet';

type RatingProps = {
  onPrev: () => void;
  onNext: () => void;
};

const RATING_STATUS = [
  {
    status: 1,
    title: '별로예요',
    img: { empty: emptyStar1, half: halfStar1, filled: filledStar1 },
  },
  {
    status: 2,
    title: '그저그래요',
    img: { empty: emptyStar2, half: halfStar2, filled: filledStar2 },
  },
  {
    status: 3,
    title: '보통이에요',
    img: { empty: emptyStar3, half: halfStar3, filled: filledStar3 },
  },
  {
    status: 4,
    title: '좋아요',
    img: { empty: emptyStar4, half: halfStar4, filled: filledStar4 },
  },
  {
    status: 5,
    title: '최고예요',
    img: { empty: emptyStar5, half: halfStar5, filled: filledStar5 },
  },
] as const;

type RatingType = (typeof RATING_STATUS)[number];

const Rating = ({ onPrev, onNext }: RatingProps) => {
  const [status, setStatus] = useState<RatingType['title']>('최고예요');
  const [rating, setRating] = useState<number>(5);

  const updateStatus = (rating: number) => {
    const statuses: RatingType['title'][] = ['별로예요', '그저그래요', '보통이에요', '좋아요', '최고예요'];
    const idx = Math.max(Math.ceil(rating) - 1, 0);

    setStatus(statuses[idx]);
    setRating(rating);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const touchPosition = touch.clientX - rect.left;
    const newRating = Math.round((touchPosition / rect.width) * 10) / 2;

    if (newRating >= 0 && newRating <= 5) {
      updateStatus(newRating);
    }
  };

  return (
    <>
      <Title message="책은 어땠나요?" />
      <SubTitle message="재미있거나 유익했나요? 책에 대한 별점을 남겨주세요" />

      <section className="mb-6 flex flex-col items-center rounded-[10px] border-2 border-accent bg-white px-3 py-6">
        <span className="mb-5 inline-block rounded-2xl border-2 border-yellow-300 px-4 py-1 font-semibold">
          {status}
        </span>
        <ul className="flex w-full justify-center" onTouchMove={handleTouchMove}>
          {RATING_STATUS.map(({ status, title, img }) => (
            <li
              className="bg-slate-30 mx-[2px] flex w-1/6 flex-col items-center justify-center place-self-start text-[10px]"
              key={status}
            >
              <img
                src={status - rating >= 1 ? img.empty : status - rating <= 0 ? img.filled : img.half}
                className="mb-3 w-12"
              />
              <p className="opacity-60">{title}</p>
            </li>
          ))}
        </ul>
      </section>
      <ButtonSet onPrev={onPrev} onNext={onNext} />
    </>
  );
};

export default Rating;
