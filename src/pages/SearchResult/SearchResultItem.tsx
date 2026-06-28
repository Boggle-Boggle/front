import { Link } from 'react-router-dom';

import { BookCover } from 'components/BookCover';

import type { SearchBook } from './api';
import { useCheckReadingRecordQuery } from './useCheckReadingRecordQuery';

type SearchResultItemProps = {
  book: SearchBook;
};

const MSG_SEARCH_RESULT_BADGE = '* 나의 책에 등록되어 있는 책입니다';

export const SearchResultItem = (props: SearchResultItemProps) => {
  const { book } = props;
  const { title, author, publisher, coverUrl, isbn13 } = book;

  const { data: readingRecordId } = useCheckReadingRecordQuery(isbn13);
  const isRegistered = !!readingRecordId;

  return (
    <Link to={`/books/${isbn13}`} className="flex w-full gap-5 py-4">
      {/* TODO: 폴백 이미지 */}
      <BookCover className="w-20" url={coverUrl ?? ''} label={title} variant="mockup" rounded="sm" />
      <div className="flex flex-1 flex-col justify-start">
        <p className="line-clamp-2 pb-1 text-title3">{title}</p>
        <p className="line-clamp-1 text-caption1 text-neutral-60">{author}</p>
        <p className="line-clamp-1 text-caption2 text-neutral-60">{publisher}</p>
        {isRegistered && <p className="pt-[0.5625rem] text-caption1 text-information">{MSG_SEARCH_RESULT_BADGE}</p>}
      </div>
    </Link>
  );
};
