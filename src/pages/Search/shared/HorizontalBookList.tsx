import BookCover from 'components/BookCover';

type HorizontalBookListProps = {
  itemCount?: number;
};

const DEFAULT_ITEMS = Array.from({ length: 4 });

export function HorizontalBookList({ itemCount = 4 }: HorizontalBookListProps) {
  const items = itemCount === 4 ? DEFAULT_ITEMS : Array.from({ length: itemCount });

  return (
    <div className="relative w-full overflow-hidden pl-mobile">
      <ul className="scrollbar-hide flex w-full gap-[0.625rem] overflow-x-auto">
        {items.map((_, index) => (
          <li key={`book-${index}`} className="h-[13.25rem] w-[6.25rem] shrink-0">
            <BookCover size="medium" />
            <p className="text-title3">책 제목을 입력해주세요</p>
            <p className="text-caption1 text-neutral-40">저자</p>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export default HorizontalBookList;
