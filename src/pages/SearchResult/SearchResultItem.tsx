import { Link } from 'react-router-dom';

import { BookCover } from 'components/BookCover';

import type { SearchBook } from './api';

type SearchResultItemProps = {
  book: SearchBook;
};

export const SearchResultItem = (props: SearchResultItemProps) => {
  const { book } = props;
  const { title, author, publisher, coverUrl, isbn13 } = book;

  return (
    <Link to={`/books/${isbn13}`} className="flex w-full gap-5 py-4">
      {/* TODO: 폴백 이미지 */}
      <BookCover className="w-20" url={coverUrl} label={title} variant="mockup" rounded="sm" isAdult={book.isAdult} />
      <div className="flex flex-1 flex-col justify-start">
        <p className="line-clamp-2 pb-1 text-title3">{title}</p>
        <p className="line-clamp-1 text-caption1 text-neutral-60">{author}</p>
        <p className="line-clamp-1 text-caption2 text-neutral-60">{publisher}</p>
      </div>
    </Link>
  );
};
