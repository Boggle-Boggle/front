import { MyBook } from 'pages/MyBooks/useMyBooksQuery';

type ReadingBooksListProps = {
  books: MyBook[];
};

const MSG_MYBOOKS_READING_STATUS_READING = '읽는중';
const MSG_MYBOOKS_READING_STATUS_STOPPED = '중단';
const MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER = '작가명을 입력해주세요';
const MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER = '00.00.00 ~ 00.00.00';

const getReadCountLabel = (readCount: number) => `${readCount}회독`;

const getStatusLabel = (book: MyBook) => {
  if (book.readingStatus === MSG_MYBOOKS_READING_STATUS_READING) return MSG_MYBOOKS_READING_STATUS_READING;
  if (book.readingStatus === MSG_MYBOOKS_READING_STATUS_STOPPED) return MSG_MYBOOKS_READING_STATUS_STOPPED;

  return getReadCountLabel(book.readCount);
};

const getRatingLabel = (rating: number) => `(${rating})`;

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalf ? '★' : '') + '☆'.repeat(emptyStars);
};

export const ReadingBooksList = (props: ReadingBooksListProps) => {
  const { books } = props;

  return (
    <div className="flex flex-col pb-6">
      {books.map((book) => {
        const statusLabel = getStatusLabel(book);
        const isReading = book.readingStatus === MSG_MYBOOKS_READING_STATUS_READING;

        return (
          <div key={book.id} className="-mb-[21px] flex flex-col items-center">
            <div className="flex w-full items-center gap-5 px-4 py-2">
              <div className="relative h-[111px] w-20 shrink-0">
                <div className="absolute inset-0 overflow-hidden rounded bg-gradient-to-l from-[#D9D9D9] via-[#FFFFFF] to-[#F9F9F9]">
                  <img src={book.cover} alt={book.title} className="size-full object-cover" loading="lazy" />
                </div>
                <div className="absolute inset-y-0 left-0 w-[9px] bg-gradient-to-r from-[#FFFFFF] to-[#E0E0E0] opacity-90" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 self-stretch pt-1">
                <div className="flex flex-col gap-1">
                  <span className="w-fit rounded-full border border-[#CACACA] px-2 py-0.5 text-caption1 text-[#888888]">
                    {statusLabel}
                  </span>

                  <div className="flex flex-col">
                    <p className="line-clamp-2 text-title3 text-[#303030]">{book.title}</p>
                    <p className="line-clamp-1 text-caption1 text-[#555555]">{MSG_MYBOOKS_LIST_AUTHOR_PLACEHOLDER}</p>
                  </div>
                </div>

                {!isReading && (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] leading-[1.2] text-[#FFAA00]">{renderStars(book.rating)}</span>
                    <span className="text-caption3 text-[#888888]">{getRatingLabel(book.rating)}</span>
                  </div>
                )}

                {isReading && (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] leading-[1.2] text-[#FFAA00]">{renderStars(book.rating)}</span>
                    <span className="text-caption3 text-neutral-80">{getRatingLabel(book.rating)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full px-4">
              <p className="text-caption1 text-neutral-40">{MSG_MYBOOKS_LIST_PERIOD_PLACEHOLDER}</p>
            </div>

            <div className="w-full">
              <div className="h-[30px] bg-gradient-to-b from-neutral-20 to-neutral-0" />
              <div className="h-[35px] bg-gradient-to-b from-neutral-20 via-[#F3F3F3] to-neutral-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
