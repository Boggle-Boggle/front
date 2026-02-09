import BookCover from 'components/BookCover';

type RealTimePopularListProps = {
  itemCount?: number;
};

const DEFAULT_ITEMS = Array.from({ length: 6 });

export function RealTimePopularList({ itemCount = 6 }: RealTimePopularListProps) {
  const items = itemCount === 6 ? DEFAULT_ITEMS : Array.from({ length: itemCount });

  return (
    <div className="relative w-full overflow-hidden pl-mobile">
      <ul className="scrollbar-hide grid w-full grid-flow-col grid-rows-3 gap-x-10 gap-y-7 overflow-x-auto pr-mobile">
        {items.map((_, index) => {
          const rank = index + 1;
          return (
            <li key={`popular-${rank}`} className="flex min-w-[16.5rem] items-center gap-3">
              <span className="w-8 text-title2 text-neutral-70">{rank}위</span>
              <BookCover size="small" />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-title3">책 제목을 입력해주세요</p>
                <p className="text-caption1 text-neutral-40">지은이를 입력하세요</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export default RealTimePopularList;
