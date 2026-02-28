import { RefObject } from 'react';

import { ReadingBooksList } from '../ReadingSection/ReadingBooksList';
import { MyBook } from '../useMyBooksQuery';

type WishlistSectionProps = {
  books: MyBook[];
  isLoading: boolean;
  observerTarget: RefObject<HTMLDivElement>;
};

const MSG_MYBOOKS_LOADING = '불러오는 중...';

export const WishlistSection = (props: WishlistSectionProps) => {
  const { books, isLoading, observerTarget } = props;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <ReadingBooksList books={books} />

      {isLoading && (
        <div className="flex justify-center py-4">
          <span className="text-caption1 text-neutral-60">{MSG_MYBOOKS_LOADING}</span>
        </div>
      )}
      <div ref={observerTarget} className="h-4 w-full" />
    </div>
  );
};
