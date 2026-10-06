import { ShelfBase } from 'components/ShelfBase';

type ReadingSectionSkeletonProps = {
  viewMode: 'grid' | 'list';
};

const GRID_SKELETON_ROWS = Array.from({ length: 3 }, (_, index) => `reading-grid-skeleton-row-${index}`);
const GRID_SKELETON_COLUMNS = Array.from({ length: 3 }, (_, index) => `reading-grid-skeleton-column-${index}`);
const LIST_SKELETON_ITEMS = Array.from({ length: 5 }, (_, index) => `reading-list-skeleton-${index}`);

const ReadingGridSkeleton = () => {
  return (
    <ul className="pb-6">
      {GRID_SKELETON_ROWS.map((row) => (
        <li key={row} className="relative pb-5">
          <ul className="relative z-book mx-auto grid grid-cols-3 items-start justify-items-center">
            {GRID_SKELETON_COLUMNS.map((column) => (
              <li key={`${row}-${column}`} className="w-20">
                <div className="skeleton h-[7.5rem] w-20 rounded-sm" />
                <div className="mt-4 flex flex-col gap-1">
                  <div className="skeleton h-3.5 w-full" />
                  <div className="skeleton h-3.5 w-4/5" />
                </div>
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

const ReadingListSkeleton = () => {
  return (
    <ul className="flex flex-col pb-6">
      {LIST_SKELETON_ITEMS.map((item) => (
        <li key={item} className="relative flex items-center justify-start pb-11">
          <div className="flex w-full items-center">
            <div className="skeleton ml-mobile h-[7.5rem] w-20 shrink-0 rounded-sm" />
            <div className="z-book flex min-w-0 flex-1 flex-col pl-5 pr-mobile">
              <div className="skeleton h-5 w-full" />
              <div className="skeleton mt-2 h-5 w-4/5" />
              <div className="skeleton mt-3 h-4 w-28" />
              <div className="skeleton mt-2 h-4 w-36" />
            </div>
          </div>

          <div className="absolute left-0 right-0 top-20">
            <ShelfBase />
            <ShelfBase />
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ReadingSectionSkeleton = (props: ReadingSectionSkeletonProps) => {
  const { viewMode } = props;
  const isGridView = viewMode === 'grid';

  return (
    <>
      <div className="flex items-center justify-between px-mobile pb-6">
        <div className="skeleton h-6 w-28" />
        <div className="skeleton h-8 w-28 rounded-full" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isGridView ? <ReadingGridSkeleton /> : <ReadingListSkeleton />}
      </div>
    </>
  );
};
