import { ShelfBase } from 'components/ShelfBase';
import { MyBook } from 'pages/MyBooks/useMyBooksQuery';

import { BookCard } from '../../shared/BookCard';

type ReadingBooksGridProps = {
  books: MyBook[];
};

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const ReadingBooksGrid = ({ books }: ReadingBooksGridProps) => {
  const rows = chunk(books, 3);

  return (
    <ul className="pb-6">
      {rows.map((row) => (
        <li key={row.toString()} className="relative pb-5">
          <ul className="z-book relative mx-auto flex justify-around">
            {row.map((book) => (
              <li key={book.id} className="w-20">
                <BookCard book={book} />
              </li>
            ))}
          </ul>

          <div className="absolute left-0 right-0 top-20">
            <ShelfBase />
            <ShelfBase />
          </div>
        </li>
      ))}
    </ul>
  );
};
