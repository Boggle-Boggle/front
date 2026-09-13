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
      className="h-2 w-full"
      role="status"
      aria-live="polite"
      aria-label="additional content is loading"
      aria-busy={isFetching}
    />
  );
};

export default InfiniteScrollTrigger;
