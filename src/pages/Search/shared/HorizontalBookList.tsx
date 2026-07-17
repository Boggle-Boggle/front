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
      <ul className="scrollbar-hide flex w-full gap-[0.625rem] overflow-x-auto px-mobile">
        {books.map(({ isbn13, title, author, coverUrl }) => (
          <li key={isbn13} className="w-[6.25rem] shrink-0">
            <Link to={`/books/${isbn13}`} className="w-full">
              <BookCover className="w-full" url={coverUrl} variant="clear" />
              <p className="line-clamp-1 text-title3">{title}</p>
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
