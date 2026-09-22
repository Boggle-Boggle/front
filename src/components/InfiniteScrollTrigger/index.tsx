import { RefObject } from 'react';

interface InfiniteScrollTriggerProps {
  observerTarget: RefObject<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetching?: boolean;
}

export const InfiniteScrollTrigger = ({
  observerTarget,
  hasNextPage = true,
  isFetching = false,
}: InfiniteScrollTriggerProps) => {
  if (!hasNextPage && !isFetching) return null;

  return (
    <div
      ref={observerTarget}
      className="flex h-12 w-full items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="additional content is loading"
      aria-busy={isFetching}
    >
      {/* TODO: 스켈레톤 */}
      {isFetching && (
        <span className="size-icon-md animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
