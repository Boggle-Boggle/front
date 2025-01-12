import { useEffect, useReducer, useRef, useState } from 'react';
import { CiCircleInfo, CiFlag1, CiCalendarDate, CiUnread, CiStar, CiShoppingTag } from 'react-icons/ci';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import { formatDateTimeToDate } from 'utils/format';

import { Record } from 'types/record';

import RecordItem from './shared/RecordItem';

type RecordTabProps = {
  book: Record;
};

const RecordTab = ({ book }: RecordTabProps) => {
  const { bookData, recordData } = book;
  const [isClamped, setIsClamped] = useState<boolean>(true);
  const [isToggledInfo, handleInfoToggle] = useReducer((prev) => !prev, true);
  const [isToggledExpand, handleExpandToggle] = useReducer((prev) => !prev, false);
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      const plot = plotRef.current;
      setIsClamped(plot.clientHeight < plot.scrollHeight);
    }
  }, []);

  return (
    <section className="bg-white">
      <RecordItem
        icons={<CiCircleInfo style={{ width: '20px', height: '20px' }} />}
        title="도서정보"
        content={
          isToggledInfo ? (
            <button onClick={handleInfoToggle} aria-label="도서 정보 자세히 보기" type="button">
              <GoChevronUp style={{ width: '20px', height: '20px' }} />
            </button>
          ) : (
            <button onClick={handleInfoToggle} aria-label="도서 정보 간략히 보기" type="button">
              <GoChevronDown style={{ width: '20px', height: '20px' }} />
            </button>
          )
        }
      />
      {isToggledInfo && (
        <section className="border-b border-main p-4">
          <p className="text-xs font-bold">책정보</p>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs opacity-70">저자</p>
            <p className="text-xs">{bookData.author}</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs opacity-70">분야</p>
            <p className="text-xs">{bookData.genre}</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs opacity-70">출판사</p>
            <p className="text-xs">{bookData.publisher}</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs opacity-70">발행일</p>
            <p className="text-xs">{formatDateTimeToDate(bookData.pubDate)}</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs opacity-70">페이지</p>
            <p className="text-xs">{bookData.page} p</p>
          </span>
          <span className="mt-4 flex justify-between text-xs font-bold">
            책소개
            {isClamped && (
              <button type="button" onClick={handleExpandToggle}>
                <p className="font-normal opacity-70">{isToggledExpand ? '간략히' : '더보기'}</p>
              </button>
            )}
          </span>
          <p className={`mt-2 text-xs leading-5 opacity-70 ${isToggledExpand || 'line-clamp-4'}`} ref={plotRef}>
            {bookData.plot}
          </p>
        </section>
      )}

      {recordData.readDateList.map((date, idx) => {
        const startDate = date.startReadDate && formatDateTimeToDate(date.startReadDate);
        const endDate = date.endReadDate && formatDateTimeToDate(date.endReadDate);

        if (!startDate) return;
        if (idx === 0)
          return (
            <li key={date.readDateId}>
              <RecordItem
                icons={<CiCalendarDate style={{ width: '20px', height: '20px' }} />}
                title="독서기간"
                content={`${startDate} ~ ${endDate ?? '독서중'}`}
              />
            </li>
          );
        return (
          <li key={date.readDateId}>
            <RecordItem
              icons={<CiCalendarDate style={{ width: '20px', height: '20px' }} />}
              title="독서기간"
              content={`${startDate} ~ ${endDate ?? '독서중'}`}
            />
          </li>
        );
      })}

      <RecordItem
        icons={<CiFlag1 style={{ width: '20px', height: '20px' }} />}
        title="회독"
        content={`${recordData.readDateList.length}회독`}
      />
      <RecordItem
        icons={<CiStar style={{ width: '20px', height: '20px' }} />}
        title="내 평점"
        content={recordData.rating}
      />

      {recordData.libraries.map((library, idx) => {
        if (idx === 0)
          return (
            <li key={library.libraryId}>
              <RecordItem
                icons={<CiShoppingTag style={{ width: '20px', height: '20px' }} />}
                title="서재분류"
                content={library.libraryName}
              />
            </li>
          );
        return (
          <li key={library.libraryId}>
            <RecordItem content={library.libraryName} />
          </li>
        );
      })}

      <RecordItem
        icons={<CiUnread style={{ width: '20px', height: '20px' }} />}
        title={recordData.isBookVisible ? '책장에서 보임' : '책장에서 숨김'}
        content={recordData.isBookVisible ? '책장에서 보임' : '책장에서 숨김'}
      />

      <RecordItem />
    </section>
  );
};

export default RecordTab;
