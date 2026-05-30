import { Book } from './Book';

export type BookCaseBook = {
  id: number;
  page: number;
  title: string;
};

type BookCaseProps = {
  books: BookCaseBook[];
};

const getThicknessPx = (page: number) => {
  if (page >= 500) return 54;
  if (page > 400) return 48;
  if (page > 300) return 40;
  if (page > 200) return 32;
  if (page > 100) return 24;
  return 16;
};

const getShelfBooks = (books: BookCaseBook[], bookcaseWidth: number) => {
  const { currentShelfBooks, shelves: reducedShelves } = books.reduce<{
    currentShelfBooks: BookCaseBook[];
    currentShelfWidth: number;
    shelves: BookCaseBook[][];
  }>(
    (acc, book) => {
      const thickness = getThicknessPx(book.page);
      const shouldStartNextShelf =
        acc.currentShelfBooks.length > 0 && acc.currentShelfWidth + thickness >= bookcaseWidth;

      if (shouldStartNextShelf) {
        return {
          currentShelfBooks: [book],
          currentShelfWidth: thickness,
          shelves: [...acc.shelves, acc.currentShelfBooks],
        };
      }

      return {
        currentShelfBooks: [...acc.currentShelfBooks, book],
        currentShelfWidth: acc.currentShelfWidth + thickness,
        shelves: acc.shelves,
      };
    },
    {
      currentShelfBooks: [],
      currentShelfWidth: 0,
      shelves: [],
    },
  );

  const shelves = currentShelfBooks.length > 0 ? [...reducedShelves, currentShelfBooks] : reducedShelves;

  if (shelves.length >= 4) {
    return shelves;
  }

  return [...shelves, ...Array.from({ length: 4 - shelves.length }, () => [])];
};

export const BookCase = (props: BookCaseProps) => {
  const { books } = props;
  const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

  // bookcaseWidth = 전체 화면너비 - 양쪽 패딩(1rem * 2) - 책장 사이 간격(1.25rem * 2) - 책장과 양끝 책사이간격-  border(2px * 2)
  const bookcaseWidth = window.innerWidth - remToPx(1 * 2) - remToPx(1.25 * 2) - remToPx(0.625 * 2) - 4;
  const allBooks = getShelfBooks(books, bookcaseWidth);

  const outerHeight = 524 + 126 * (allBooks.length - 4);
  const outerBoxShadow = 'inset 2px 2px 2px rgba(255, 255, 255, 0.6), inset -2px -3px 3px rgba(53, 27, 20, 0.25)';
  const innerHeight = 484 + 126 * (allBooks.length - 4);
  const innerBoxShadow = '2px 2px 2px rgba(255, 255, 255, 0.6), -2px -2px 2px rgba(53, 27, 20, 0.25)';
  const innerBackground = 'linear-gradient(180deg, rgba(224, 224, 224, 1) 0%, rgba(242, 242, 242, 1) 100%)';

  return (
    <div
      style={{ boxShadow: outerBoxShadow, height: outerHeight }}
      className="w-full rounded-[32px] border border-neutral-20 bg-neutral-0 p-5"
    >
      <div
        style={{ boxShadow: innerBoxShadow, height: innerHeight, background: innerBackground }}
        className="flex w-full flex-col justify-start rounded-xl py-4"
      >
        {allBooks.map((shelfBooks, idx) => {
          const shelfSpacingClass = idx === allBooks.length - 1 ? '' : 'pb-4';

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className={shelfSpacingClass} key={`shelf-${idx}`}>
              <div className="h-[5.625rem] px-[0.625rem]">
                {shelfBooks.map(({ id, page, title }) => (
                  <Book page={page} title={title} key={id} />
                ))}
              </div>

              {idx !== allBooks.length - 1 && (
                <div style={{ boxShadow: 'inset 0px -4px 4px rgba(53, 27, 20, 0.25)' }} className="h-5 bg-neutral-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
