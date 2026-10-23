type SkeletonProps = {
  className: string;
};

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;

  return (
    <span
      className={`relative inline-block overflow-hidden rounded bg-neutral-20 before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-0/40 before:to-transparent before:content-[''] motion-reduce:before:animate-none ${className}`}
      aria-hidden="true"
    />
  );
};
