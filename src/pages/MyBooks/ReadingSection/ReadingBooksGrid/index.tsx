import { MyBook } from 'pages/MyBooks/useMyBooksQuery';

import { BookCard } from '../../shared/BookCard';

type ReadingBooksGridProps = {
  books: MyBook[];
};

export const ReadingBooksGrid = (props: ReadingBooksGridProps) => {
  const { books } = props;

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-7 pb-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
