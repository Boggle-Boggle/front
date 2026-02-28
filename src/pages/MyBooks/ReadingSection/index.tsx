import { RefObject } from 'react';

import { TextButton } from 'components/Button';
import { IconArrowDown, IconMenu } from 'components/icons';

import { ReadingBooksGrid } from '../shared/ReadingBooksGrid';
import { ReadingBooksList } from '../shared/ReadingBooksList';
import { MyBook } from '../useMyBooksQuery';

type ReadingSectionProps = {
  books: MyBook[];
  totalCount: number;
  isGridView: boolean;
  isLoading: boolean;
  observerTarget: RefObject<HTMLDivElement>;
  onOpenFilterLayer: () => void;
  onOpenSortLayer: () => void;
};

const MSG_MYBOOKS_ALL_BOOKS = '모든 책';
const MSG_MYBOOKS_SORT_LATEST = '최신순';
const MSG_MYBOOKS_LOADING = '불러오는 중...';

export const ReadingSection = (props: ReadingSectionProps) => {
  const { books, totalCount, isGridView, isLoading, observerTarget, onOpenFilterLayer, onOpenSortLayer } = props;

  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <button type="button" className="flex items-center gap-1" onClick={onOpenFilterLayer}>
          <IconMenu className="size-icon-md" />
          <span className="text-body1">{MSG_MYBOOKS_ALL_BOOKS}</span>
          <span className="text-caption1 text-neutral-60">({totalCount})</span>
        </button>
        <TextButton
          variant="filled"
          size="sm"
          rightIcon={IconArrowDown}
          onClick={onOpenSortLayer}
          text={MSG_MYBOOKS_SORT_LATEST}
        />
      </div>

      {isGridView && <ReadingBooksGrid books={books} />}
      {!isGridView && <ReadingBooksList books={books} />}

      {isLoading && <div> 로딩중</div>}
      <div ref={observerTarget} className="h-4 w-full" />
    </>
  );
};
