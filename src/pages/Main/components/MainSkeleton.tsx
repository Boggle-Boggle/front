import { BookCase } from 'components/BookCase';

const MSG_MAIN_SEARCHBAR_SKELETON = '검색 영역 로딩 중';
const MSG_MAIN_TITLE_SKELETON = '책장 제목 로딩 중';
const MSG_MAIN_COUNT_SKELETON = '책장 개수 로딩 중';

export const MainSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden bg-secondary">
      <div className="relative z-background flex h-full flex-col px-mobile pt-safe-top">
        <div className="flex h-12 items-center">
          <div className="skeleton h-10 w-full rounded-[28px]" role="status" aria-label={MSG_MAIN_SEARCHBAR_SKELETON} />
        </div>
        <div className="skeleton mt-4 h-8 w-36" aria-label={MSG_MAIN_TITLE_SKELETON} />
        <div className="skeleton mb-[1.375rem] mt-2 h-5 w-24" aria-label={MSG_MAIN_COUNT_SKELETON} />
        <div className="h-0 flex-grow overflow-y-auto pb-safe-bottom">
          <BookCase books={[]} isSkeleton />
        </div>
      </div>

      <div className="absolute inset-0 bg-neutral-0/80" />
      <div className="absolute bottom-0 h-36 w-full bg-[linear-gradient(180deg,_var(--color-primary-light)_0%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};
