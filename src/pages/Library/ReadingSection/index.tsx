import { RefObject } from 'react';

import { TextButton } from 'components/Button';
import { Loading } from 'components/Loading';
import { IconArrowDown, IconMenu } from 'components/icons';

import { ReadingBooksGrid } from './ReadingBooksGrid';
import { ReadingBooksList } from './ReadingBooksList';
import { MyBook } from '../useLibraryQuery';

type ReadingSectionProps = {
  books: MyBook[];
  totalCount: number;
  filterLabel: string;
  sortLabel: string;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  observerTarget: RefObject<HTMLDivElement>;
  onOpenFilterLayer: () => void;
  onOpenSortLayer: () => void;
};

export const ReadingSection = (props: ReadingSectionProps) => {
  const {
    books,
    totalCount,
    filterLabel,
    sortLabel,
    viewMode,
    isLoading,
    observerTarget,
    onOpenFilterLayer,
    onOpenSortLayer,
  } = props;
  const isGridView = viewMode === 'grid';

  return (
    <>
      <div className="flex items-center justify-between px-mobile pb-6">
        <button type="button" className="flex items-center gap-1" onClick={onOpenFilterLayer}>
          <IconMenu className="size-icon-md" />
          <span className="text-body1">{filterLabel}</span>
          <span className="text-caption1 text-neutral-60">({totalCount})</span>
        </button>
        <TextButton variant="filled" size="sm" rightIcon={IconArrowDown} onClick={onOpenSortLayer} text={sortLabel} />
      </div>

      <div className="overflow-y-auto">
        {isGridView && <ReadingBooksGrid books={books} />}
        {!isGridView && <ReadingBooksList books={books} />}
      </div>
      {isLoading && <Loading />}
      <div ref={observerTarget} className="h-4 w-full" />
    </>
  );
};
