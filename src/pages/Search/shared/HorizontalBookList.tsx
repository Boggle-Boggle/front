import BookCover from 'components/BookCover';

const items = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `책 제목 ${index + 1}`,
  author: `저자 ${index + 1}`,
  url: 'https://image.aladin.co.kr/product/38515/3/cover500/e202637227_1.jpg',
}));

export const HorizontalBookList = () => {
  return (
    <div className="relative w-full overflow-hidden pb-5 pl-mobile">
      <ul className="scrollbar-hide flex w-full gap-[0.625rem] overflow-x-auto">
        {items.map(({ id, title, author, url }) => (
          <li key={id} className="h-[13.25rem] w-[6.25rem] shrink-0">
            <BookCover size="medium" url={url} />
            <p className="text-title3">{title}</p>
            <p className="text-caption1 text-neutral-40">{author}</p>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default HorizontalBookList;
