import { BookCover } from 'components/BookCover';

type RecordDetailHeroProps = {
  cover: string;
  title: string;
  author: string;
  rating: string;
  readingStatus: string;
  noteCount: string;
};

const MSG_RECORD_DETAIL_RATING = '별점';
const MSG_RECORD_DETAIL_NOTE = '독서노트';

export const RecordDetailHero = (props: RecordDetailHeroProps) => {
  const { cover, title, author, rating, readingStatus, noteCount } = props;

  return (
    <section className="bg-neutral-10 px-mobile pb-6 pt-safe-top">
      <div className="flex gap-5 pt-6">
        <BookCover className="w-28 shrink-0" url={cover} label={title} variant="mockup" rounded="sm" />

        <div className="flex min-w-0 flex-1 flex-col justify-end gap-3">
          <div>
            <p className="line-clamp-2 text-title2 text-neutral-100">{title}</p>
            <p className="mt-1 line-clamp-1 text-body2 text-neutral-60">{author}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-caption1 text-neutral-80">
            <span className="rounded-full bg-neutral-0 px-3 py-1">{readingStatus}</span>
            <span className="rounded-full bg-neutral-0 px-3 py-1">
              {MSG_RECORD_DETAIL_RATING} {rating}
            </span>
            <span className="rounded-full bg-neutral-0 px-3 py-1">
              {MSG_RECORD_DETAIL_NOTE} {noteCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
