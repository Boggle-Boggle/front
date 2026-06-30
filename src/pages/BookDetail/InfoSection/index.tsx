import Highlight from 'components/Highlight';

type InfoSectionProps = {
  publisher: string;
  category: string;
  publishedDate: string;
  isbn13: string;
  description: string | null;
  sourceLink: string;
};

const MSG_BOOK_DETAIL_INFO_TITLE = '작품 정보 ';
const MSG_BOOK_DETAIL_PLOT_TITLE = '작품 소개/줄거리 ';
const MSG_BOOK_DETAIL_SOURCE_PREFIX = '* 알라딘으로부터 도서 DB 정보를 제공받았습니다.';

export const InfoSection = (props: InfoSectionProps) => {
  const { publisher, category, publishedDate, isbn13, description, sourceLink } = props;
  const bookInfoItems = [
    { label: '출판사', value: publisher },
    { label: '분야', value: category },
    { label: '발행일자', value: publishedDate },
    { label: 'ISBN', value: isbn13 },
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
      <p className="whitespace-pre-wrap break-words pt-3 text-body1 text-neutral-80">{description}</p>
      <button
        type="button"
        onClick={() => {
          window.location.href = sourceLink;
        }}
        className="break-words pt-7 text-left text-caption1 text-neutral-60"
      >
        {MSG_BOOK_DETAIL_SOURCE_PREFIX}
      </button>
    </>
  );
};
