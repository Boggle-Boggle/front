import BookCover from 'components/BookCover';

const ITEM_COUNT = 12;

const MSG_SEARCH_POPULAR_TITLE_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_SEARCH_POPULAR_AUTHOR_PLACEHOLDER = '지은이를 입력하세요';

const items = Array.from({ length: ITEM_COUNT });

export const RealTimePopularList = () => {
  return (
    <div className="relative w-full overflow-hidden pl-mobile">
      <ul className="scrollbar-hide grid w-full grid-flow-col grid-rows-3 gap-x-10 gap-y-3 overflow-x-auto pr-mobile">
        {items.map((_, index) => {
          const rank = index + 1;
          return (
            <li key={`popular-${rank}`} className="flex min-w-[19rem] items-center gap-[0.625rem]">
              <span className="w-8 text-body2 text-neutral-100">{rank}위</span>
              <BookCover size="small" url="" />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-title4 text-neutral-100">{MSG_SEARCH_POPULAR_TITLE_PLACEHOLDER}</p>
                <p className="truncate text-caption1 text-neutral-60">{MSG_SEARCH_POPULAR_AUTHOR_PLACEHOLDER}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[35px] bg-gradient-to-r from-white/70 to-transparent" />
    </div>
  );
};

export default RealTimePopularList;
