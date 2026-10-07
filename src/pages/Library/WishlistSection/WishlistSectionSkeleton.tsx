const WISHLIST_SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => `wishlist-skeleton-${index}`);

export const WishlistSectionSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between px-mobile pb-3">
        <div className="skeleton h-4 w-36" />
        <div className="skeleton h-8 w-28 rounded-full" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col px-mobile">
          {WISHLIST_SKELETON_ITEMS.map((item) => (
            <li key={item} className="flex items-center justify-between gap-4 border-b border-neutral-20 py-4">
              <div className="flex min-w-0 flex-1 items-stretch self-stretch">
                <div className="skeleton h-[7.5rem] w-20 shrink-0 rounded-sm" />
                <div className="flex min-w-0 flex-1 flex-col pl-4">
                  <div className="skeleton h-5 w-full" />
                  <div className="skeleton mt-2 h-5 w-4/5" />
                  <div className="skeleton mt-3 h-4 w-28" />
                  <div className="skeleton mt-auto h-4 w-36" />
                </div>
              </div>

              <div className="skeleton size-10 shrink-0 rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
