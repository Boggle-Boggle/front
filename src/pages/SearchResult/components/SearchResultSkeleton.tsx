import { BackButton } from 'components/Header/BackButton';
import { Searchbar } from 'components/Searchbar';

type SearchResultSkeletonProps = {
  query: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
};

const SEARCH_RESULT_SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => `search-result-skeleton-${index}`);

export const SearchResultSkeleton = (props: SearchResultSkeletonProps) => {
  const { query, onSearchChange, onSearchSubmit } = props;

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom pt-safe-top">
      <div className="flex w-full items-center justify-start gap-2 pb-4 pr-mobile">
        <BackButton />
        <Searchbar value={query} onChange={onSearchChange} onSubmit={onSearchSubmit} className="grow" />
      </div>

      <div className="flex w-full items-center justify-between px-mobile pb-5">
        <div className="skeleton h-4 w-36" />
        <div className="skeleton h-9 w-28 rounded-full" />
      </div>

      <ul className="flex w-full flex-col divide-y divide-neutral-20 px-mobile">
        {SEARCH_RESULT_SKELETON_ITEMS.map((item) => (
          <li key={item} className="flex w-full gap-5 py-4">
            <div className="skeleton h-[7.5rem] w-20 shrink-0 rounded-sm" />
            <div className="flex flex-1 flex-col pt-1">
              <div className="skeleton h-5 w-full" />
              <div className="skeleton mt-2 h-5 w-4/5" />
              <div className="skeleton mt-3 h-4 w-32" />
              <div className="skeleton mt-2 h-4 w-24" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
