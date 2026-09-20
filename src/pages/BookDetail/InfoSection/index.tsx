import { Empty } from 'components/Empty';
import Highlight from 'components/Highlight';

import adultContentGuideImage from 'assets/img/adult-content-guide.png';

type InfoSectionProps = {
  publisher: string;
  category: string;
  publishedDate: string;
  isbn13: string;
  description: string | null;
  isAdultBook?: boolean;
};

const MSG_BOOK_DETAIL_INFO_TITLE = '작품 정보 ';
const MSG_BOOK_DETAIL_PLOT_TITLE = '작품 소개/줄거리 ';
const MSG_BOOK_DETAIL_EMPTY_PLOT = '줄거리 정보가 없어요';
const MSG_BOOK_DETAIL_ADULT_CONTENT =
  "해당 작품은 민감한 콘텐츠입니다.\n열람을 원하시면 [설정] > [콘텐츠 설정]에서 '민감한 콘텐츠 가리기'를 꺼주세요.";

export const InfoSection = (props: InfoSectionProps) => {
  const { publisher, category, publishedDate, isbn13, description, isAdultBook = false } = props;
  const hasDescription = Boolean(description?.trim());
  const bookInfoItems = [
    { label: '출판사', value: publisher },
    { label: '분야', value: category },
    { label: '발행일자', value: publishedDate },
    { label: 'ISBN', value: isbn13 },
  ];

  return (
    <>
      <Highlight text={MSG_BOOK_DETAIL_INFO_TITLE} className="w-fit pt-6 text-title4" />
      <ul className="pt-3">
        {bookInfoItems.map((item) => (
          <li key={item.label} className="pb-1 text-caption1 text-neutral-80">
            <span className="text-body2">{item.label} : </span>
            <span className="break-words">{item.value}</span>
          </li>
        ))}
      </ul>
      <Highlight text={MSG_BOOK_DETAIL_PLOT_TITLE} className="w-fit pt-6 text-title4" />
      <div className="pt-3">
        {isAdultBook ? (
          <>
            <img className="m-auto size-[13.4375rem]" src={adultContentGuideImage} alt="" />
            <p className="whitespace-pre-line break-keep text-caption1 text-neutral-80">
              {MSG_BOOK_DETAIL_ADULT_CONTENT}
            </p>
          </>
        ) : hasDescription ? (
          <p className="whitespace-pre-wrap break-words text-caption1 text-neutral-80">{description}</p>
        ) : (
          <Empty text={MSG_BOOK_DETAIL_EMPTY_PLOT} />
        )}
      </div>
    </>
  );
};
