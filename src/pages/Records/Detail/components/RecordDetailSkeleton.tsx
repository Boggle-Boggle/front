import { Header } from 'components/Header';
import { ShelfBase } from 'components/ShelfBase';

const RECORD_INFO_SKELETON_ITEMS = Array.from({ length: 5 }, (_, index) => `record-info-skeleton-${index}`);
const RECORD_TAB_SKELETON_ITEMS = Array.from({ length: 3 }, (_, index) => `record-tab-skeleton-${index}`);

export const RecordDetailSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto pb-safe-bottom">
      <section className="relative overflow-hidden">
        <div className="bg-neutral-30 absolute inset-x-0 top-0 h-80" />
        <Header withBack withSpacer transparent />

        <div className="relative z-book flex h-full flex-col items-center">
          <div className="flex w-full flex-1 flex-col items-center px-mobile pt-[2.125rem]">
            <div className="relative z-book w-[7.875rem] shrink-0">
              <div className="skeleton aspect-[109/152] w-full rounded-sm" />
            </div>

            <div className="relative -mt-[1.3125rem] w-[calc(100%+2rem)] shrink-0 bg-white">
              <ShelfBase height={42} layerOpacity={1} />
              <ShelfBase height={128} layerOpacity={1} />
            </div>

            <div className="relative flex w-full flex-col items-center px-3 pb-7">
              <div className="-mt-[7.0625rem] flex w-full flex-col items-center">
                <div className="skeleton h-6 w-52" />
                <div className="skeleton mt-2 h-4 w-24" />
              </div>

              <div className="mt-5 flex w-full items-center justify-between rounded-2xl bg-neutral-0 px-5 py-2 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.2)]">
                <div className="flex w-20 flex-col items-center gap-2">
                  <div className="skeleton h-3 w-10" />
                  <div className="skeleton h-5 w-8" />
                </div>
                <div className="h-12 w-px bg-neutral-20" aria-hidden />
                <div className="flex w-20 flex-col items-center gap-2">
                  <div className="skeleton h-3 w-12" />
                  <div className="skeleton h-5 w-14" />
                </div>
                <div className="h-12 w-px bg-neutral-20" aria-hidden />
                <div className="flex w-20 flex-col items-center gap-2">
                  <div className="skeleton h-3 w-12" />
                  <div className="skeleton h-5 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-mobile">
        <div className="mb-6 grid grid-cols-3 gap-2">
          {RECORD_TAB_SKELETON_ITEMS.map((item) => (
            <div key={item} className="skeleton h-10 w-full rounded-full" />
          ))}
        </div>

        <section className="pb-safe-bottom">
          <div className="skeleton mb-3 h-5 w-20" />
          <ul className="pb-7">
            {RECORD_INFO_SKELETON_ITEMS.map((item) => (
              <li key={item} className="flex gap-2 py-1">
                <div className="skeleton h-4 w-16" />
                <div className="skeleton h-4 flex-1" />
              </li>
            ))}
          </ul>

          <div className="skeleton mb-3 h-5 w-28" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-11/12" />
            <div className="skeleton h-4 w-4/5" />
          </div>
        </section>
      </div>
    </div>
  );
};
