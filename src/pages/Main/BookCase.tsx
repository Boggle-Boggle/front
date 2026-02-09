import Book from './Book';

const books = [
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

const BookCase = () => {
  const allBooks = [];
  let chunkedBooks = [];
  let chunkedWidth = 0;

  for (let i = 0; i < books.length; i += 1) {
    const { page } = books[i];

    if (page >= 500) chunkedWidth += 54;
    else if (page > 400) chunkedWidth += 48;
    else if (page > 300) chunkedWidth += 40;
    else if (page > 200) chunkedWidth += 32;
    else if (page > 100) chunkedWidth += 24;
    else chunkedWidth += 16;

    // inner 너비 - 양옆 패딩
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

  const outerHeight = 524 + 126 * (allBooks.length - 4);
  const outerBoxShadow = 'inset 2px 2px 2px rgba(255, 255, 255, 0.6), inset -2px -3px 3px rgba(53, 27, 20, 0.25)';
  const innerHeight = 484 + 126 * (allBooks.length - 4);
  const innerBoxShadow = '2px 2px 2px rgba(255, 255, 255, 0.6), -2px -2px 2px rgba(53, 27, 20, 0.25)';
  const dividerHeight = 20 + 126 * (allBooks.length - 4);

  return (
    <div
      style={{ boxShadow: outerBoxShadow, height: outerHeight }}
      className="w-[21.438rem] rounded-[32px] border border-neutral-20 p-5"
    >
      <div
        style={{ boxShadow: innerBoxShadow, height: innerHeight }}
        className="w-[18.938rem] rounded-xl bg-neutral-20"
      >
        {allBooks.map((books, idx) => (
          <div className="pt-4" key={books.toString()}>
            <div className="h-[5.625rem] px-[0.625rem]">
              {books.map(({ id, page, title }) => (
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

export default BookCase;
