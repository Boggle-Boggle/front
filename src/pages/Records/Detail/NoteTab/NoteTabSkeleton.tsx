const NOTE_TAB_SKELETON_ITEMS = Array.from({ length: 3 }, (_, index) => `note-tab-skeleton-${index}`);

export const NoteTabSkeleton = () => {
  return (
    <section className="pb-safe-bottom">
      <div className="mb-6 flex items-center justify-between">
        <div className="skeleton h-4 w-36" />
        <div className="skeleton h-8 w-20 rounded-full" />
      </div>

      <ul>
        {NOTE_TAB_SKELETON_ITEMS.map((item) => (
          <li key={item} className="mb-5 flex flex-col rounded-2xl px-4 pb-5 pt-2 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between">
              <div className="skeleton h-5 w-40" />
              <div className="skeleton size-8 rounded-full" />
            </div>

            <div className="flex flex-col gap-2 pb-3 pt-1">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-11/12" />
              <div className="skeleton h-4 w-4/5" />
            </div>

            <div className="skeleton h-3 w-32" />
          </li>
        ))}
      </ul>
    </section>
  );
};
