import BookCover from 'components/BookCover';
import { Divider } from 'components/Divider';
import { Header } from 'components/Header';
import Highlight from 'components/Highlight';

const MSG_SEARCH_REALTIME_POPULAR_TITLE = '실시간 인기 도서';
const MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL = '{rank}위';

type PopularBook = {
  id: number;
  rank: number;
  title: string;
  author: string;
  url: string;
};

const popularBooks: PopularBook[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  rank: index + 1,
  title: '책 제목을 입력해주세요',
  author: '지은이를 입력하세요',
  url: 'https://image.aladin.co.kr/product/38515/3/cover500/e202637227_1.jpg',
}));

const RealTimePopular = () => {
  const getRankLabel = (rank: number) => MSG_SEARCH_REALTIME_POPULAR_RANK_LABEL.replace('{rank}', String(rank));

  return (
    <div className="flex h-full w-full flex-col pb-safe-bottom">
      <Header title={MSG_SEARCH_REALTIME_POPULAR_TITLE} withBack />

      <ul className="flex-1 overflow-y-auto px-mobile">
        {popularBooks.map(({ id, rank, title: bookTitle, author, url }, index) => (
          <>
            <li key={id} className="flex items-center py-5">
              {rank <= 3 ? (
                <Highlight text={getRankLabel(rank)} className="w-8 text-center text-body2" />
              ) : (
                <p className="w-8 text-body2">{getRankLabel(rank)}</p>
              )}
              <BookCover className="mx-[0.625rem] w-20" url={url} rounded="sm" />
              <div className="flex min-w-0 flex-col justify-center gap-1">
                <p className="line-clamp-1 text-title3">{bookTitle}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-60">{author}</p>
              </div>
            </li>
            {index < popularBooks.length - 1 && <Divider />}
          </>
        ))}
      </ul>
    </div>
  );
};

export default RealTimePopular;
