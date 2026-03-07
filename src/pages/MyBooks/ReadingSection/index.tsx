import { RefObject } from 'react';

import { TextButton } from 'components/Button';
import { IconArrowDown, IconMenu } from 'components/icons';

import { ReadingBooksGrid } from './ReadingBooksGrid';
import { ReadingBooksList } from './ReadingBooksList';
import { MyBook } from '../useMyBooksQuery';

type ReadingSectionProps = {
  books: MyBook[];
  totalCount: number;
  filterLabel: string;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  observerTarget: RefObject<HTMLDivElement>;
  onOpenFilterLayer: () => void;
  onOpenSortLayer: () => void;
};

const MSG_MYBOOKS_SORT_LATEST = '최신순';

export const ReadingSection = (props: ReadingSectionProps) => {
  const { books, totalCount, filterLabel, viewMode, isLoading, observerTarget, onOpenFilterLayer, onOpenSortLayer } =
    props;
  const isGridView = viewMode === 'grid';

  return (
    <>
      <div className="flex items-center justify-between px-mobile pb-6">
        <button type="button" className="flex items-center gap-1" onClick={onOpenFilterLayer}>
          <IconMenu className="size-icon-md" />
          <span className="text-body1">{filterLabel}</span>
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

      <div className="overflow-y-auto">
        {isGridView && <ReadingBooksGrid books={books} />}
        {!isGridView && <ReadingBooksList books={books} />}
      </div>
      {isLoading && <div> 로딩중</div>}
      <div ref={observerTarget} className="h-4 w-full" />
    </>
  );
};
