import emptyStarImg from 'assets/stars/empty/star.png';
import filledStarImg from 'assets/stars/filled/star.png';
import halfStarImg from 'assets/stars/half/star.png';

type StarProps = {
  rating: number;
  size: 'sm' | 'lg';
};

const Star = ({ rating, size }: StarProps) => {
  const getStarImg = (limit: number) => {
    if (rating - limit >= 0) return filledStarImg;
    if (rating - limit > -1) return halfStarImg;
    return emptyStarImg;
  };

  return (
    <section className="flex">
      <img src={getStarImg(1)} alt="" className={size === 'sm' ? 'w-4' : 'w-5'} />
      <img src={getStarImg(2)} alt="" className={size === 'sm' ? 'w-4' : 'w-5'} />
      <img src={getStarImg(3)} alt="" className={size === 'sm' ? 'w-4' : 'w-5'} />
      <img src={getStarImg(4)} alt="" className={size === 'sm' ? 'w-4' : 'w-5'} />
      <img src={getStarImg(5)} alt="" className={size === 'sm' ? 'w-4' : 'w-5'} />
    </section>
  );
};

export default Star;
