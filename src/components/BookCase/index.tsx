import { useState, useEffect, useRef } from 'react';

import { Book } from './Book';
import { getBookThickness } from './utils';

export type BookCaseBook = {
  id: number;
  page: number;
  title: string;
};

type BookCaseProps = {
  books: BookCaseBook[];
  onBookClick?: (id: number) => void;
};

const getShelfBooks = (books: BookCaseBook[], bookcaseWidth: number) => {
  const { currentShelfBooks, shelves: reducedShelves } = books.reduce<{
    currentShelfBooks: BookCaseBook[];
    currentShelfWidth: number;
    shelves: BookCaseBook[][];
  }>(
    (acc, book) => {
      const thickness = getBookThickness(book.page).px;
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
  const { books, onBookClick } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const remToPx = (rem: number) => {
    if (typeof document === 'undefined') return rem * 16;
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  };

  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 300;
    try {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      // bookcaseWidth = 전체 화면너비 - 양쪽 패딩(1rem * 2) - 책장 외곽 패딩(1.25rem * 2) - border(1px * 2)
      return window.innerWidth - rootFontSize * (1 * 2 + 1.25 * 2) - 2;
    } catch {
      return 300;
    }
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setContainerWidth(entry.contentRect.width);
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // bookcaseWidth = ResizeObserver로 구한 가용 너비 - 책장 내부의 양끝 책 간격(px-[0.625rem] * 2)
  const bookcaseWidth = containerWidth - remToPx(0.625 * 2);
  const allBooks = getShelfBooks(books, bookcaseWidth);

  const outerHeight = 524 + 126 * (allBooks.length - 4);
  const outerBoxShadow = 'inset 2px 2px 2px rgba(255, 255, 255, 0.6), inset -2px -3px 3px rgba(53, 27, 20, 0.25)';
  const innerHeight = 484 + 126 * (allBooks.length - 4);
  const innerBoxShadow = '2px 2px 2px rgba(255, 255, 255, 0.6), -2px -2px 2px rgba(53, 27, 20, 0.25)';
  const innerBackground = 'linear-gradient(180deg, rgba(224, 224, 224, 1) 0%, rgba(242, 242, 242, 1) 100%)';

  return (
    <div
      ref={containerRef}
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
                  <Book page={page} title={title} key={id} onClick={() => onBookClick?.(id)} />
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
