import { Link } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { ScrollFadeOverlay } from 'components/ScrollFadeOverlay';

export interface HorizontalBookItem {
  isbn13: string;
  title: string;
  author: string;
  coverUrl: string | null;
}

interface HorizontalBookListProps {
  books?: HorizontalBookItem[];
}

export const HorizontalBookList = ({ books = [] }: HorizontalBookListProps) => {
  return (
    <div className="relative w-full overflow-hidden pb-10">
      <ul className="scrollbar-hide flex w-full snap-x snap-mandatory scroll-px-mobile gap-[0.625rem] overflow-x-auto scroll-smooth px-mobile">
        {books.map(({ isbn13, title, author, coverUrl }) => (
          <li key={isbn13} className="w-[6.25rem] shrink-0 snap-start">
            <Link to={`/books/${isbn13}`} className="w-full">
              <BookCover className="w-full" url={coverUrl} variant="clear" />
              <p className="mt-2 line-clamp-1 text-title4">{title}</p>
              <p className="line-clamp-1 text-caption1 text-neutral-40">{author}</p>
            </Link>
          </li>
        ))}
      </ul>

      <ScrollFadeOverlay intensity="hard" className="w-10" />
    </div>
  );
};

export default HorizontalBookList;
