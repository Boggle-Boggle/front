import Highlight from 'components/Highlight';

const MSG_BOOK_INFO_TITLE = '작품 정보';
const MSG_BOOK_INFO_DETAIL_TITLE = '작품 소개/줄거리';

const RECORD_INFO_ITEMS = [
  { label: '작가이름', value: '아무개' },
  { label: '출판사', value: '아무개 출판사' },
  { label: '분야', value: '예술/대중문화' },
  { label: '발행일자', value: '2025년 03월 28일' },
  { label: 'ISBN', value: '0000-0000-0000' },
];

const RECORD_SUMMARY =
  '전례 없는 미술 열풍이 불고 있다. 소셜미디어와 플랫폼의 발달로 예술에 대한 접근성과 수요가 크게 높아졌다. 예술은 이제 누구나 쉽게 감상할 수 있는 분야가 되었다. 하지만 아직 많은 사람이 작품을 보고도 의미를 제대로 이해하지 못해 혼란스러워하는 경우가 적지 않다. 특히 미술을 전공하지 않은 일반인이라면 작품 앞에 서서 한 번쯤 이런 질문을 던져봤을 것이다. "근데, 이 작품을 어떻게 감상해야 하지?"';

export const BookInfoTab = () => {
  return (
    <section className="pb-safe-bottom">
      <Highlight text={MSG_BOOK_INFO_TITLE} className="mb-3 text-title4" />
      <ul className="pb-7">
        {RECORD_INFO_ITEMS.map((item) => (
          <li key={item.label} className="text-neutral-80">
            <span className="text-body2">{item.label} : </span>
            <span className="break-words text-caption1">{item.value}</span>
          </li>
        ))}
      </ul>

      <Highlight text={MSG_BOOK_INFO_DETAIL_TITLE} className="mb-3 text-title4" />
      <p className="whitespace-pre-wrap break-words text-body1 text-neutral-80">{RECORD_SUMMARY}</p>
    </section>
  );
};
