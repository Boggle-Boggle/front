import { useNavigate } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { ScrollFadeOverlay } from 'components/ScrollFadeOverlay';

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
  const navigate = useNavigate();

  const getRankLabel = (rank: number) => MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL.replace('{rank}', String(rank));

  const handleLoadMore = () => navigate('/search/realtime-popular');

  return (
    <>
      <Title text={MSG_SEARCH_REALTIME_POPULAR_TITLE} onLoadMore={handleLoadMore} />
      <section className="relative w-full pb-10">
        <ol className="scrollbar-hide grid grid-flow-col grid-rows-3 gap-x-10 gap-y-4 overflow-x-auto px-mobile">
          {popularBooks.map(({ id, rank, title, author, url }) => (
            <li key={id} className="flex h-28 w-80 items-center">
              <span className="flex h-full items-center justify-center text-title3">{getRankLabel(rank)}</span>
              <BookCover className="mx-4 mr-[0.625rem] w-20" url={url} variant="clear" rounded="sm" />
              <div>
                <p className="line-clamp-1 text-title3">{title}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-60">{author}</p>
              </div>
            </li>
          ))}
        </ol>
        <ScrollFadeOverlay intensity="hard" className="w-[3.5rem]" />
      </section>
    </>
  );
};
