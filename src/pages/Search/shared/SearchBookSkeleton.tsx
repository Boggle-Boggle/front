import { Divider } from 'components/Divider';
import { Header } from 'components/Header';

type SearchBookGridPageSkeletonProps = {
  title: React.ReactNode;
};

type SearchBookRankingPageSkeletonProps = {
  title: string;
};

const GRID_SKELETON_ITEMS = Array.from({ length: 9 }, (_, index) => `search-grid-skeleton-${index}`);
const RANKING_SKELETON_ITEMS = Array.from({ length: 8 }, (_, index) => `search-ranking-skeleton-${index}`);

export const SearchBookGridSkeleton = () => {
  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-9">
      {GRID_SKELETON_ITEMS.map((item) => (
        <li key={item} className="w-full">
          <div className="skeleton aspect-[2/3] w-full" />
          <div className="skeleton mt-2 h-4 w-full" />
          <div className="skeleton mt-1 h-4 w-4/5" />
          <div className="skeleton mt-1 h-3 w-3/5" />
        </li>
      ))}
    </ul>
  );
};

export const SearchBookRankingSkeleton = () => {
  return (
    <>
      {RANKING_SKELETON_ITEMS.map((item, index) => (
        <li key={item}>
          <div className="flex items-center py-5">
            <div className="skeleton h-5 w-10 shrink-0" />
            <div className="skeleton mx-[0.625rem] h-[7.5rem] w-20 shrink-0 rounded-sm" />
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="skeleton h-5 w-full" />
              <div className="skeleton mt-2 h-4 w-3/5" />
            </div>
          </div>
          {index < RANKING_SKELETON_ITEMS.length - 1 && <Divider />}
        </li>
      ))}
    </>
  );
};

export const SearchBookGridPageSkeleton = (props: SearchBookGridPageSkeletonProps) => {
  const { title } = props;

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={title} withBack />
      <div className="flex-1 overflow-y-auto px-mobile pb-6 pt-5">
        <SearchBookGridSkeleton />
      </div>
    </div>
  );
};

export const SearchBookRankingPageSkeleton = (props: SearchBookRankingPageSkeletonProps) => {
  const { title } = props;

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={title} withBack />
      <ul className="flex-1 overflow-y-auto px-mobile">
        <SearchBookRankingSkeleton />
      </ul>
    </div>
  );
};
