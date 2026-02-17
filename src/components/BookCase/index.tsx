type BookCaseBook = {
  id: number;
  page: number;
  title: string;
};

type BookProps = {
  page: number;
  title: string;
};

const books: BookCaseBook[] = [
  {
    title: '턴! 턴! 턴! Turn! Turn! Turn!',
    page: 85,
    id: 1,
  },
  {
    title: '여름을 한입 베어물었더니',
    page: 192,
    id: 2,
  },
  {
    title: '코스모스',
    page: 706,
    id: 3,
  },
  {
    title: '날씨가 좋으면 찾아가다가 돌아오겠어요',
    page: 456,
    id: 4,
  },
  {
    title: '사과 APPLE',
    page: 317,
    id: 5,
  },
  {
    title: '기억을 파는 가게',
    page: 221,
    id: 6,
  },
  {
    title: '시간을 건너는 소녀',
    page: 398,
    id: 7,
  },
  {
    title: '눈 감으면 들리는 노래',
    page: 154,
    id: 8,
  },
  {
    title: '오늘도 무사히 지나가기를 간절히 바라고 바라고 티기고 티기고',
    page: 288,
    id: 9,
  },
  {
    title: '바다를 닮은 너에게',
    page: 522,
    id: 10,
  },
  {
    title: '별빛이 내린 거리에서 돌아다니기 권법',
    page: 611,
    id: 11,
  },
  {
    title: '소리를 삼킨 이름들',
    page: 203,
    id: 12,
  },
  {
    title: '구름 사이로 걸어간 날들',
    page: 467,
    id: 13,
  },
  {
    title: '빛이 머무는 순간',
    page: 359,
    id: 14,
  },
  {
    title: '턴! 턴! 턴! Turn! Turn! Turn!',
    page: 85,
    id: 1,
  },
  {
    title: '여름을 한입 베어물었더니',
    page: 192,
    id: 2,
  },
  {
    title: '코스모스',
    page: 706,
    id: 3,
  },
  {
    title: '날씨가 좋으면 찾아가다가 돌아오겠어요',
    page: 456,
    id: 4,
  },
  {
    title: '사과 APPLE',
    page: 317,
    id: 5,
  },
  {
    title: '기억을 파는 가게',
    page: 221,
    id: 6,
  },
  {
    title: '시간을 건너는 소녀',
    page: 398,
    id: 7,
  },
  {
    title: '눈 감으면 들리는 노래',
    page: 154,
    id: 8,
  },
  {
    title: '오늘도 무사히 지나가기를 간절히 바라고 바라고 티기고 티기고',
    page: 288,
    id: 9,
  },
  {
    title: '바다를 닮은 너에게',
    page: 522,
    id: 10,
  },
  {
    title: '별빛이 내린 거리에서 돌아다니기 권법',
    page: 611,
    id: 11,
  },
  {
    title: '소리를 삼킨 이름들',
    page: 203,
    id: 12,
  },
  {
    title: '구름 사이로 걸어간 날들',
    page: 467,
    id: 13,
  },
  {
    title: '빛이 머무는 순간',
    page: 359,
    id: 14,
  },
  {
    title: '턴! 턴! 턴! Turn! Turn! Turn!',
    page: 85,
    id: 1,
  },
  {
    title: '여름을 한입 베어물었더니',
    page: 192,
    id: 2,
  },
  {
    title: '코스모스',
    page: 706,
    id: 3,
  },
  {
    title: '날씨가 좋으면 찾아가다가 돌아오겠어요',
    page: 456,
    id: 4,
  },
  {
    title: '사과 APPLE',
    page: 317,
    id: 5,
  },
  {
    title: '기억을 파는 가게',
    page: 221,
    id: 6,
  },
  {
    title: '시간을 건너는 소녀',
    page: 398,
    id: 7,
  },
  {
    title: '눈 감으면 들리는 노래',
    page: 154,
    id: 8,
  },
  {
    title: '오늘도 무사히 지나가기를 간절히 바라고 바라고 티기고 티기고',
    page: 288,
    id: 9,
  },
  {
    title: '바다를 닮은 너에게',
    page: 522,
    id: 10,
  },
  {
    title: '별빛이 내린 거리에서 돌아다니기 권법',
    page: 611,
    id: 11,
  },
  {
    title: '소리를 삼킨 이름들',
    page: 203,
    id: 12,
  },
  {
    title: '구름 사이로 걸어간 날들',
    page: 467,
    id: 13,
  },
  {
    title: '빛이 머무는 순간',
    page: 359,
    id: 14,
  },
];

const bookColors = ['bg-primary-light', 'bg-secondary', 'bg-secondary-light'];

export const BookCase = () => {
  const allBooks: BookCaseBook[][] = [];
  let chunkedBooks: BookCaseBook[] = [];
  let chunkedWidth = 0;

  for (let i = 0; i < books.length; i += 1) {
    const { page } = books[i];

    if (page >= 500) chunkedWidth += 54;
    else if (page > 400) chunkedWidth += 48;
    else if (page > 300) chunkedWidth += 40;
    else if (page > 200) chunkedWidth += 32;
    else if (page > 100) chunkedWidth += 24;
    else chunkedWidth += 16;

    if (chunkedWidth >= 300 - 16) {
      allBooks.push(chunkedBooks);

      chunkedBooks = [];
      chunkedWidth = 0;
      i -= 1;
    } else chunkedBooks.push(books[i]);
  }

  if (chunkedBooks.length > 0) allBooks.push(chunkedBooks);

  while (allBooks.length < 3) {
    allBooks.push([]);
  }

  const outerHeight = 568 + 126 * (allBooks.length - 4);
  const outerBoxShadow = 'inset 2px 2px 2px rgba(255, 255, 255, 0.6), inset -2px -3px 3px rgba(53, 27, 20, 0.25)';
  const innerHeight = 528 + 126 * (allBooks.length - 4);
  const innerBoxShadow = '2px 2px 2px rgba(255, 255, 255, 0.6), -2px -2px 2px rgba(53, 27, 20, 0.25)';
  const innerBackground = 'linear-gradient(180deg, rgba(224, 224, 224, 1) 0%, rgba(242, 242, 242, 1) 100%)';

  return (
    <div
      style={{ boxShadow: outerBoxShadow, height: outerHeight }}
      className="w-[21.438rem] rounded-[32px] border border-neutral-20 bg-neutral-0 p-5"
    >
      <div
        style={{ boxShadow: innerBoxShadow, height: innerHeight, background: innerBackground }}
        className="flex w-[18.938rem] flex-col justify-end rounded-xl pt-[10px]"
      >
        {allBooks.map((shelfBooks, idx) => (
          <div key={shelfBooks.toString()}>
            <div className="h-[5.625rem] px-[0.625rem]">
              {shelfBooks.map(({ id, page, title }) => (
                <Book page={page} title={title} key={id} />
              ))}
            </div>

            {idx !== allBooks.length - 1 && (
              <div style={{ boxShadow: 'inset 0px -4px 4px rgba(53, 27, 20, 0.25)' }} className="h-5 bg-neutral-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Book = (props: BookProps) => {
  const { page, title } = props;
  const bgColorClass = bookColors[page % bookColors.length];

  const widthClass =
    page >= 500
      ? 'w-14'
      : page >= 400
        ? 'w-12'
        : page >= 300
          ? 'w-10'
          : page >= 200
            ? 'w-8'
            : page >= 100
              ? 'w-6'
              : 'w-4';

  const filteredTitle = title.replace(/[^a-zA-Z0-9가-힣]+/g, '').slice(0, page >= 400 ? 21 : page >= 200 ? 14 : 7);

  return (
    <div
      style={{ boxShadow: 'inset 0px -1.11px 3.33px rgba(0, 0, 0, 0.25)', writingMode: 'vertical-lr' }}
      className={`inline-flex h-full justify-center rounded-sm py-2 ${widthClass} ${bgColorClass}`}
    >
      <span className="flex w-full items-center justify-center text-center font-book text-[10px] opacity-40">
        {filteredTitle}
      </span>
    </div>
  );
};
