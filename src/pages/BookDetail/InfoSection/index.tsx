import Highlight from 'components/Highlight';

type InfoSectionProps = {
  publisher: string;
  genre: string;
  pubDate: string;
  isbn: string;
  plot: string;
};

const MSG_BOOK_DETAIL_INFO_TITLE = '작품 정보 ';
const MSG_BOOK_DETAIL_PLOT_TITLE = '작품 소개/줄거리 ';
const MSG_BOOK_DETAIL_SOURCE_PREFIX = '* 알라딘으로부터 도서 DB 정보를 제공받았습니다.';

export const InfoSection = (props: InfoSectionProps) => {
  const { publisher, genre, pubDate, isbn, plot } = props;
  const bookInfoItems = [
    { label: '출판사', value: publisher },
    { label: '분야', value: genre },
    { label: '발행일자', value: pubDate },
    { label: 'ISBN', value: isbn },
  ];

  return (
    <>
      <Highlight text={MSG_BOOK_DETAIL_INFO_TITLE} className="w-fit pt-[1.875rem] text-title3" />
      <ul className="pt-3">
        {bookInfoItems.map((item) => (
          <li key={item.label} className="pb-1 text-caption1 text-neutral-80">
            <span className="text-body2">{item.label} : </span>
            <span className="break-words">{item.value}</span>
          </li>
        ))}
      </ul>
      <Highlight text={MSG_BOOK_DETAIL_PLOT_TITLE} className="w-fit pt-[1.875rem] text-title3" />
      <p className="whitespace-pre-wrap break-words pt-3 text-body1 text-neutral-80">{plot}</p>
      <p className="break-words pt-7 text-caption1 text-neutral-60">{MSG_BOOK_DETAIL_SOURCE_PREFIX}</p>
    </>
  );
};
