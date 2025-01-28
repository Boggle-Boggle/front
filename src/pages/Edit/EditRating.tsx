import { RATING_STATUS } from 'types/record';

type EditRatingPros = {
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

const EditRating = ({ rating, setRating }: EditRatingPros) => {
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const touchPosition = touch.clientX - rect.left;
    const newRating = Math.round((touchPosition / rect.width) * 10) / 2;

    if (newRating >= 0 && newRating <= 5) {
      setRating(newRating);
    }
  };
  return (
    <>
      <p className="flex h-14 items-center border-t-[3px] border-main px-6 font-semibold">별점</p>
      <section className="flex flex-col items-center px-5 pb-5">
        <span className="mb-5 inline-flex rounded-2xl border-2 border-yellow-300 px-4 py-1 font-semibold">
          {(rating ?? 0).toFixed(1)}
        </span>
        <ul className="justify-center- flex w-full px-2" onTouchMove={handleTouchMove}>
          {RATING_STATUS.map(({ status, title, img }) => (
            <li
              className="bg-slate-30 mx-[2px] flex w-1/6 grow flex-col items-center justify-center place-self-start text-[10px]"
              key={status}
            >
              <img
                src={status - (rating ?? 0) >= 1 ? img.empty : status - (rating ?? 0) <= 0 ? img.filled : img.half}
                className="mb-3 w-12"
                alt=""
              />
              <p className="opacity-60">{title}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default EditRating;
