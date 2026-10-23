import { Skeleton } from 'components/Skeleton';
import { IconHeart } from 'components/icons';

const REVIEW_PLACEHOLDERS = ['first', 'second', 'third'];

export const ReviewListSkeleton = () => (
  <ul className="divide-y divide-neutral-20" aria-busy="true" aria-label="리뷰를 불러오는 중">
    {REVIEW_PLACEHOLDERS.map((item) => (
      <li key={item} className="py-mobile" aria-hidden="true">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        <div className="mt-3 flex h-8 items-center justify-end">
          <div className="inline-flex items-center gap-1 rounded-full bg-neutral-20 px-2 py-1">
            <IconHeart className="size-icon-md text-neutral-60" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </li>
    ))}
  </ul>
);
