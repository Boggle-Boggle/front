import BookCover from 'components/BookCover';

import Title from '../shared/Title';

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

const splitByColumns = (items: PopularBook[], columnSize: number) => {
  return items.reduce<PopularBook[][]>((acc, item, index) => {
    if (index % columnSize === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);
    return acc;
  }, []);
};

const RealTimePopularSection = () => {
  const columns = splitByColumns(popularBooks, 3);

  return (
    <section className="w-full">
      <Title text="실시간 인기도서" onLoadMore={() => {}} />
      <div className="relative w-full overflow-hidden pb-6">
        <ol className="scrollbar-hide flex w-full gap-6 overflow-x-auto px-mobile">
          {columns.map((column) => (
            <li className="shrink-0">
              <ol className="flex w-[18.5rem] flex-col gap-6">
                {column.map(({ id, rank, title, author, url }) => (
                  <li key={id} className="flex w-full items-start gap-4">
                    <span className="text-neutral-70 pt-2 text-title3">{rank}위</span>
                    <BookCover size="medium" url={url} />
                    <div className="flex flex-1 flex-col justify-center gap-1 pt-3">
                      <p className="text-title3 text-neutral-80">{title}</p>
                      <p className="text-body2 text-neutral-50">{author}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
};

export default RealTimePopularSection;
