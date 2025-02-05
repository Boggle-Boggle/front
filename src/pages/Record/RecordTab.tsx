import { useEffect, useReducer, useRef, useState } from 'react';

import Icon from 'components/Icon';
import Star from 'components/Star';

import { formatDateTimeToDate } from 'utils/format';

import { Record } from 'types/record';

import { RecordInfo, RecordPeriod, RecordCategory, RecordRating, RecordHide, CommonUp, CommonDown } from 'assets/icons';

import RecordItem from './shared/RecordItem';

type RecordTabProps = {
  book: Record;
};

const RecordTab = ({ book }: RecordTabProps) => {
  const { bookData, recordData } = book;
  const [isClamped, setIsClamped] = useState<boolean>(true);
  const [isToggledInfo, handleInfoToggle] = useReducer((prev) => !prev, false);
  const [isToggledDate, handleDateToggle] = useReducer((prev) => !prev, false);
  const [isToggledLibrary, handleLibraryToggle] = useReducer((prev) => !prev, false);
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
        icons={<Icon Component={RecordInfo} size="sm" />}
        title="도서정보"
        content={
          isToggledInfo ? (
            <button onClick={handleInfoToggle} aria-label="도서 정보 자세히 보기" type="button">
              <Icon Component={CommonDown} size="xs" />
            </button>
          ) : (
            <button onClick={handleInfoToggle} aria-label="도서 정보 간략히 보기" type="button">
              <Icon Component={CommonUp} size="xs" />
            </button>
          )
        }
      />
      <section
        className={`grid ${isToggledInfo ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr]'} transition-all duration-200`}
      >
        <div className={`overflow-hidden border-b border-main px-4 ${isToggledInfo && 'pb-4'}`}>
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
        </div>
      </section>

      <RecordItem
        icons={<Icon Component={RecordPeriod} size="sm" />}
        title="독서기간"
        content={
          !recordData.readDateList.length ? (
            <p className="text-sm opacity-50">독서기간 없음</p>
          ) : isToggledDate ? (
            <button onClick={handleDateToggle} aria-label="독서기간 자세히 보기" type="button" className="inline-flex">
              <p className="mr-2 text-sm opacity-50">{`${recordData.readDateList.length}회독`}</p>
              <Icon Component={CommonDown} size="xs" />
            </button>
          ) : (
            <button onClick={handleDateToggle} aria-label="독서기간 간략히 보기" type="button" className="inline-flex">
              <p className="mr-2 text-sm opacity-50">{`${recordData.readDateList.length}회독`}</p>
              <Icon Component={CommonUp} size="xs" />
            </button>
          )
        }
      />

      <section className={`grid ${isToggledDate ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-200`}>
        <ul className="overflow-hidden">
          {recordData.readDateList.map((date, idx) => {
            const startDate = date.startReadDate && formatDateTimeToDate(date.startReadDate);
            const endDate = date.endReadDate && formatDateTimeToDate(date.endReadDate);

            if (!startDate) return;
            return (
              <li key={date.readDateId}>
                <RecordItem
                  title={
                    <div className="inline-flex">
                      <p className="px-[0.376rem] text-sm">{idx + 1}회독</p>
                      <span className="rounded-3xl border border-accent px-1 py-[1px] text-xs text-accent">
                        {endDate ? '다읽음' : '읽는중'}
                      </span>
                    </div>
                  }
                  content={`${startDate} ~ ${endDate ?? '읽는중'}`}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <RecordItem
        icons={<Icon Component={RecordCategory} size="sm" />}
        title="서재분류"
        content={
          !recordData.libraries.length ? (
            <p className="text-sm opacity-50">지정된 서재 없음</p>
          ) : isToggledLibrary ? (
            <button
              onClick={handleLibraryToggle}
              aria-label="서재분류 자세히 보기"
              type="button"
              className="inline-flex"
            >
              <p className="mr-2 text-sm opacity-50">
                {`${recordData.libraries[0].libraryName} 외 ${recordData.libraries.length - 1}개`}
              </p>
              <Icon Component={CommonDown} size="xs" />
            </button>
          ) : (
            <button
              onClick={handleLibraryToggle}
              aria-label="서재분류 간략히 보기"
              type="button"
              className="inline-flex"
            >
              <p className="mr-2 text-sm opacity-50">
                {`${recordData.libraries[0].libraryName} 외 ${recordData.libraries.length - 1}개`}
              </p>
              <Icon Component={CommonUp} size="xs" />
            </button>
          )
        }
      />

      <section
        className={`grid ${isToggledLibrary ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-200`}
      >
        {recordData.libraries.map((library) => (
          <li key={library.libraryId} className="overflow-hidden">
            <RecordItem content={library.libraryName} />
          </li>
        ))}
      </section>

      <RecordItem
        icons={<Icon Component={RecordRating} size="sm" />}
        title="내 평점"
        content={<Star rating={recordData.rating ?? 0} size="lg" />}
      />

      <RecordItem
        icons={<Icon Component={RecordHide} size="sm" />}
        title={recordData.isBookVisible ? '책장에서 보임' : '책장에서 숨김'}
        content={recordData.isBookVisible ? '보이기' : '숨기기'}
      />
    </section>
  );
};

export default RecordTab;
