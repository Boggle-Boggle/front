import { Title } from '../shared/Title';

const POPULAR_SEARCH_SKELETON_ITEMS = Array.from({ length: 10 }, (_, index) => `popular-search-skeleton-${index}`);
const MSG_SEARCH_POPULAR = '인기 검색어';

export const PopularSearchSkeleton = () => {
  const leftColumn = POPULAR_SEARCH_SKELETON_ITEMS.slice(0, 5);
  const rightColumn = POPULAR_SEARCH_SKELETON_ITEMS.slice(5, 10);

  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_POPULAR} />
      <div className="flex w-full gap-3 px-mobile">
        <div className="flex flex-1 flex-col gap-4">
          {leftColumn.map((item) => (
            <div key={item} className="skeleton h-5 w-28" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rightColumn.map((item) => (
            <div key={item} className="skeleton h-5 w-28" />
          ))}
        </div>
      </div>
    </section>
  );
};
