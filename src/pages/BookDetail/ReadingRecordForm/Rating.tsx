import { RATING_STATUS } from 'types/record';

import ButtonSet from './shared/ButtonSet';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type RatingProps = {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;

  onPrev: () => void;
  onNext: () => void;
};

const Rating = ({ rating, setRating, onPrev, onNext }: RatingProps) => {
  const updateStatus = (rating: number) => {
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
          {rating.toFixed(1)}
        </span>
        <ul className="flex w-full justify-center px-2" onTouchMove={handleTouchMove}>
          {RATING_STATUS.map(({ status, title, img }) => (
            <li
              className="bg-slate-30 mx-[2px] flex w-1/6 grow flex-col items-center justify-center place-self-start text-[10px]"
              key={status}
            >
              <img
                src={status - rating >= 1 ? img.empty : status - rating <= 0 ? img.filled : img.half}
                className="mb-3 w-12"
                alt=""
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
