import { RefObject } from 'react';

import { TextButton } from 'components/Button';
import { InfiniteScrollTrigger } from 'components/InfiniteScrollTrigger';
import { IconArrowDown, IconMenu } from 'components/icons';

import { ReadingBooksGrid } from './ReadingBooksGrid';
import { ReadingBooksList } from './ReadingBooksList';
import { ReadingSectionSkeleton } from './ReadingSectionSkeleton';
import type { MyBook } from '../queries/useLibraryQuery';

type ReadingSectionProps = {
  books: MyBook[];
  totalCount: number;
  filterLabel: string;
  sortLabel: string;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
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
    hasNextPage,
    isFetchingNextPage,
    observerTarget,
    onOpenFilterLayer,
    onOpenSortLayer,
  } = props;
  const isGridView = viewMode === 'grid';

  if (isLoading) return <ReadingSectionSkeleton viewMode={viewMode} />;

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

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isGridView && <ReadingBooksGrid books={books} />}
        {!isGridView && <ReadingBooksList books={books} />}
        <InfiniteScrollTrigger
          observerTarget={observerTarget}
          hasNextPage={hasNextPage}
          isFetching={isFetchingNextPage}
        />
      </div>
    </>
  );
};
