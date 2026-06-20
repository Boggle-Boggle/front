import { Link } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { ScrollFadeOverlay } from 'components/ScrollFadeOverlay';

const items = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `책 제목 ${index + 1}`,
  author: `저자 ${index + 1}`,
  url: 'https://image.aladin.co.kr/product/38515/3/cover500/e202637227_1.jpg',
}));

export const HorizontalBookList = () => {
  return (
    <div className="relative w-full overflow-hidden pb-5">
      <ul className="scrollbar-hide flex w-full gap-[0.625rem] overflow-x-auto px-mobile">
        {items.map(({ id, title, author, url }) => (
          <li key={id} className="w-[6.25rem] shrink-0">
            <Link to={`/books/${id}`} className="w-full">
              <BookCover className="w-full" url={url} variant="clear" />
              <p className="text-title3">{title}</p>
              <p className="text-caption1 text-neutral-40">{author}</p>
            </Link>
          </li>
        ))}
      </ul>

      <ScrollFadeOverlay intensity="hard" className="w-10" />
    </div>
  );
};

export default HorizontalBookList;
