import BookCover from 'components/BookCover';

import { Title } from '../shared/Title';

const MSG_SEARCH_REALTIME_POPULAR_TITLE = '실시간 인기 도서';
const MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL = '{rank}위';

type PopularBook = {
  id: number;
  rank: number;
  title: string;
  author: string;
  url: string;
};

const popularBooks: PopularBook[] = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  rank: index + 1,
  title: '책 제목을 입력해주세요',
  author: '지은이를 입력하세요',
  url: 'https://image.aladin.co.kr/product/38515/3/cover500/e202637227_1.jpg',
}));

export const RealTimePopularSection = () => {
  const getRankLabel = (rank: number) => MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL.replace('{rank}', String(rank));

  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_REALTIME_POPULAR_TITLE} onLoadMore={() => {}} />
      <div className="relative w-full overflow-hidden pb-6">
        <ol className="scrollbar-hide grid grid-flow-col grid-rows-3 gap-x-10 gap-y-3 overflow-x-auto pl-mobile pr-0">
          {popularBooks.map(({ id, rank, title, author, url }) => (
            <li
              key={id}
              className="grid h-[6.9375rem] w-[19rem] grid-cols-[2rem_5rem_minmax(0,1fr)] items-center gap-[0.625rem]"
            >
              <span className="text-neutral-70 flex h-full items-center justify-center text-title3">
                {getRankLabel(rank)}
              </span>
              <BookCover size="small" url={url} />
              <div className="flex min-w-0 flex-col justify-center gap-1">
                <p className="line-clamp-1 text-title3 text-neutral-80">{title}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-50">{author}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[2.1875rem] bg-gradient-to-l from-white/70 to-white/0" />
      </div>
    </section>
  );
};
