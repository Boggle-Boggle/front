import BookCover from 'components/BookCover';

type BookSummaryProps = {
  title: string;
  author: string;
  cover: string;
};

export const BookSummary = (props: BookSummaryProps) => {
  const { title, author, cover } = props;

  return (
    <section className="flex flex-col items-center py-5 text-center">
      <BookCover className="w-28" url={cover} />
      <p className="pt-4 text-title1">{title}</p>
      <p className="text-body2 text-neutral-60">{author}</p>
    </section>
  );
};
