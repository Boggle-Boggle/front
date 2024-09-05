import { formatDateAndTime } from 'utils/format';

import { Book } from 'types/book';

type SearchBookResultProps = {
  book: Book;
};
const SearchBookResult = ({ book }: SearchBookResultProps) => {
  const { yy, mm, dd } = formatDateAndTime(book.pubDate);

  return (
    <div className="flex h-[126px] items-center p-2">
      <img
        src={book.cover}
        className="mr-3 h-[100px] w-[70px] drop-shadow-md"
        alt={`${book.title}책 커버`}
      />
      <div className="flex h-full flex-grow flex-col justify-between">
        <span className="line-clamp-1 text-sm font-semibold">{book.title}</span>
        <div className="text-sub text-[11px]">
          <div className="line-clamp-1">{`저자 ${book.author}`}</div>
          <div className="line-clamp-1">{`출판 ${book.publisher}`}</div>
          <div>{`${yy}년 ${mm}월 ${dd}일`}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBookResult;
