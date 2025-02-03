import { useNavigate } from 'react-router-dom';

import { LibraryBook } from 'types/library';

import shadowImg from 'assets/library/shadow.png';
import triangleImg from 'assets/library/triangle.png';

type GridItemProps = {
  book: LibraryBook;
};

const GridItem = ({ book }: GridItemProps) => {
  const navigate = useNavigate();
  const { title, rating, imageUrl, readingCount, readingRecordId } = book;

  return (
    <button type="button" onClick={() => navigate(`/record/${readingRecordId}`)} className="h-full w-full">
      <div className="relative aspect-[13/16] h-[95%] w-full shadow-[2px_0_10px_0_rgba(0,0,0,0.5)]">
        <img src={imageUrl} alt={`${title} 북커버`} className="z-20 h-full max-h-full w-full max-w-full object-cover" />
        <span className="absolute left-1 top-0 h-full w-[0.0625rem] bg-black opacity-50 blur-[2px]" />
        <img src={shadowImg} alt="" className="absolute -bottom-1 right-0 z-50 translate-x-[1.45rem] opacity-95" />
        {readingCount > 0 && (
          <>
            <img src={triangleImg} alt="" className="absolute right-0 top-0 h-8 w-8" />
            <span className="absolute right-[0.1rem] top-0 flex flex-col items-end pt-1 text-[0.65rem] font-bold leading-none text-white">
              {Number(rating).toFixed(1)}
            </span>
          </>
        )}
      </div>
    </button>
  );
};

export default GridItem;
