import Highlight from 'components/Highlight';

import type { BookInfo } from './api';

const MSG_BOOK_INFO_TITLE = '작품 정보';
const MSG_BOOK_INFO_DETAIL_TITLE = '작품 소개/줄거리';

type BookInfoTabProps = {
  book: BookInfo;
};

export const BookInfoTab = ({ book }: BookInfoTabProps) => {
  const recordInfoItems = [
    { label: '작가이름', value: book.author },
    { label: '출판사', value: book.publisher },
    { label: '분야', value: book.category || '-' },
    { label: '발행일자', value: book.publishedDate || '-' },
    { label: 'ISBN', value: book.isbn13 || '-' },
  ];

  return (
    <section className="pb-safe-bottom">
      <Highlight text={MSG_BOOK_INFO_TITLE} className="mb-3 text-title4" />
      <ul className="pb-7">
        {recordInfoItems.map((item) => (
          <li key={item.label} className="text-neutral-80">
            <span className="text-body2">{item.label} : </span>
            <span className="break-words text-caption1">{item.value}</span>
          </li>
        ))}
      </ul>

      {book.description && (
        <>
          <Highlight text={MSG_BOOK_INFO_DETAIL_TITLE} className="mb-3 text-title4" />
          <p className="whitespace-pre-wrap break-words text-body1 text-neutral-80">{book.description}</p>
        </>
      )}
    </section>
  );
};
