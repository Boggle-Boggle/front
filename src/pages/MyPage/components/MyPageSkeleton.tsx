const MY_PAGE_STAT_SKELETON_ITEMS = Array.from({ length: 3 }, (_, index) => `my-page-stat-skeleton-${index}`);
const MY_PAGE_MENU_SKELETON_ITEMS = Array.from({ length: 5 }, (_, index) => `my-page-menu-skeleton-${index}`);

export const MyPageSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto bg-neutral-0">
      <div className="relative h-auto overflow-hidden bg-neutral-0 pb-6 pt-safe-top">
        <div className="absolute inset-0">
          <div className="opacity-76 absolute right-[-4.35rem] top-[-6.5625rem] h-[18.75rem] w-[18.75rem] rounded-full bg-[radial-gradient(circle_at_34%_38%,color-mix(in_srgb,var(--color-primary)_96%,transparent)_0%,color-mix(in_srgb,var(--color-secondary-light)_90%,transparent)_100%)] blur-[1rem]" />
          <div className="absolute -left-[2.65rem] top-[7.6875rem] h-[11.275rem] w-[11.275rem] rounded-full bg-[radial-gradient(circle_at_42%_40%,color-mix(in_srgb,var(--color-primary)_92%,transparent)_0%,color-mix(in_srgb,var(--color-secondary-light)_82%,transparent)_100%)] opacity-80 blur-[0.95rem]" />
          <div className="opacity-72 absolute left-[2.55rem] top-[14.625rem] h-[23.5rem] w-[23.5rem] rounded-full bg-[radial-gradient(circle_at_40%_36%,color-mix(in_srgb,var(--color-primary)_84%,transparent)_0%,color-mix(in_srgb,var(--color-secondary-light)_94%,transparent)_72%)] blur-[0.95rem]" />
        </div>

        <div className="relative mx-6 mt-6 flex h-[19.3125rem] flex-col items-center justify-center overflow-hidden rounded-3xl bg-neutral-80/20 px-4 text-neutral-0 shadow-[inset_0.125rem_0.125rem_0.125rem_rgba(255,255,255,0.6)] backdrop-blur-[1.25rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_42%)]" />

          <div className="skeleton size-24 rounded-full" />
          <div className="skeleton mt-[0.625rem] h-7 w-32" />
          <div className="skeleton mt-[0.125rem] h-4 w-28" />

          <div className="grid w-full grid-cols-3 gap-2 pt-4">
            {MY_PAGE_STAT_SKELETON_ITEMS.map((item) => (
              <div
                key={item}
                className="flex h-20 flex-col items-center justify-center rounded-xl border-2 border-neutral-0"
              >
                <div className="size-icon-md" />
                <div className="skeleton mt-2 h-3 w-12" />
                <div className="skeleton mt-1 h-4 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {MY_PAGE_MENU_SKELETON_ITEMS.map((item) => (
        <div
          key={item}
          className="flex h-20 w-full items-center gap-2 border-b border-neutral-20 px-mobile first:border-t"
        >
          <div className="flex h-11 min-w-0 flex-1 flex-col justify-start gap-[0.125rem]">
            <div className="skeleton h-5 w-28" />
            <div className="skeleton h-4 w-52" />
          </div>
          <div className="size-icon-md" />
        </div>
      ))}
    </div>
  );
};
