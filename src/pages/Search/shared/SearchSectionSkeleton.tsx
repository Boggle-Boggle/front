type SearchSectionSkeletonProps = {
  title?: string;
  variant: 'horizontalBooks' | 'rankingBooks' | 'featuredBook';
};

const HORIZONTAL_BOOK_SKELETON_ITEMS = Array.from({ length: 4 }, (_, index) => `horizontal-book-skeleton-${index}`);
const RANKING_BOOK_SKELETON_ITEMS = Array.from({ length: 9 }, (_, index) => `ranking-book-skeleton-${index}`);

const HorizontalBooksSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden pb-10">
      <ul className="scrollbar-hide flex w-full snap-x snap-mandatory scroll-px-mobile gap-[0.625rem] overflow-x-auto scroll-smooth px-mobile">
        {HORIZONTAL_BOOK_SKELETON_ITEMS.map((item) => (
          <li key={item} className="w-[6.25rem] shrink-0 snap-start">
            <div className="skeleton aspect-[2/3] w-full" />
            <div className="skeleton mt-2 h-4 w-full" />
            <div className="skeleton mt-1 h-3 w-3/5" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const RankingBooksSkeleton = () => {
  return (
    <section className="relative w-full pb-10">
      <ol className="scrollbar-hide grid snap-x snap-mandatory scroll-px-mobile grid-flow-col grid-rows-3 gap-x-2 gap-y-4 overflow-x-auto scroll-smooth px-mobile">
        {RANKING_BOOK_SKELETON_ITEMS.map((item) => (
          <li key={item} className="flex h-28 w-80 snap-start items-center">
            <div className="h-5 w-10 shrink-0" />
            <div className="skeleton mx-4 mr-[0.625rem] h-[7.5rem] w-20 shrink-0 rounded-sm" />
            <div className="min-w-0 flex-1">
              <div className="skeleton h-5 w-full" />
              <div className="skeleton mt-2 h-4 w-3/5" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

const FeaturedBookSkeleton = () => {
  return (
    <ul className="mb-3 flex justify-center px-mobile">
      <li className="flex h-[11.625rem] w-full rounded-[16px] border-[1px] border-neutral-20 shadow-[0_0.375rem_0.9375rem_0_#A0B1C040]">
        <div className="flex h-full w-full min-w-0 gap-5 p-6">
          <div className="skeleton w-[6.25rem] shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="skeleton h-5 w-32" />
            <div className="mt-2 flex flex-col gap-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-11/12" />
              <div className="skeleton h-4 w-4/5" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export const SearchSectionSkeleton = (props: SearchSectionSkeletonProps) => {
  const { title, variant } = props;

  return (
    <>
      <div className="flex w-full items-center justify-between px-mobile pb-5">
        {title ? <p className="text-title2">{title}</p> : <div className="skeleton h-7 w-40" />}
        <div className="skeleton h-4 w-10" />
      </div>
      {variant === 'horizontalBooks' && <HorizontalBooksSkeleton />}
      {variant === 'rankingBooks' && <RankingBooksSkeleton />}
      {variant === 'featuredBook' && <FeaturedBookSkeleton />}
    </>
  );
};
