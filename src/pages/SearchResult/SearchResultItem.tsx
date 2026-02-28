import { Link } from 'react-router-dom';

import { BookCover } from 'components/BookCover';

import { Book } from 'types/book';

import { useCheckReadingRecordQuery } from './useCheckReadingRecordQuery';

type SearchResultItemProps = {
  book: Book;
};

const MSG_SEARCH_RESULT_BADGE = '* 나의 책에 등록되어 있는 책입니다';

export const SearchResultItem = (props: SearchResultItemProps) => {
  const { book } = props;
  const { title, author, publisher, cover, isbn } = book;

  const { data: readingRecordId } = useCheckReadingRecordQuery(isbn);
  const isRegistered = !!readingRecordId;

  return (
    <Link to={`/detail/${isbn}`} className="flex w-full gap-5 py-4 first:pt-0">
      <div className="shrink-0">
        <BookCover className="w-20" url={cover} label={title} shadowLeftBar />
      </div>
      <div className="flex flex-1 flex-col justify-between py-2">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-title3 text-neutral-100">{title}</h3>
          <div className="flex flex-col text-caption1 text-neutral-60">
            <span className="line-clamp-1">{author}</span>
            <span className="line-clamp-1 text-caption2">{publisher}</span>
          </div>
        </div>
        {isRegistered && <span className="text-primary-default text-caption1">{MSG_SEARCH_RESULT_BADGE}</span>}
      </div>
    </Link>
  );
};
