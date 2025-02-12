import { useQuery } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';
import { getBookDetail, hasReadingRecord } from 'services/search';
import { formatDateAndTime, formatBookGenre, getHttpsLink } from 'utils/format';

import { RecordInfo, CommonBack } from 'assets/icons';

import BookShelf from './BookShelf';
import ExistingRecordModal from './ExistingRecordModal';
import PlotDetailModal from './PlotDetailModal';
import ReadingRecordForm from './ReadingRecordForm';

const BookDetail = () => {
  const { isOpen, close, scrollPos, open } = useModal();
  const { isOpen: plotIsOpen, scrollPos: plotScrollPos, close: plotClose, open: plotOpen } = useModal();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isClamped, setIsClamped] = useState<boolean>(false);
  const [clampLine, setClampLine] = useState<number | null>(null);

  const plotRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { detailId = '' } = useParams();
  const { isIOS } = useDevice();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data: book } = useQuery({
    queryKey: ['bookDetail', detailId],
    queryFn: () => getBookDetail(detailId),
  });

  const handleSaveBook = async () => {
    const readingRecord = await hasReadingRecord(detailId);

    if (readingRecord) {
      open();

      return;
    }

    setIsRecording(true);
  };

  useEffect(() => {
    if (!book || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsClamped(true);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [book]);

  useEffect(() => {
    if (!plotRef.current) return;

    const plot = plotRef.current;

    setClampLine(Math.floor((plot!.clientHeight - 20) / 25));
  }, [isClamped, clampLine]);

  // TODO : notFound
  if (!book) return;

  const { yy, mm, dd } = formatDateAndTime(book.pubDate);

  return (
    book && (
      <>
        <Header
          leftBtn={
            <button onClick={handleGoBack} aria-label="뒤로가기" type="button">
              <Icon Component={CommonBack} />
            </button>
          }
          rightBtn={
            <button onClick={handleSaveBook} type="button" className="font-semibold text-accent">
              저장
            </button>
          }
        />

        <div className={`${isIOS ? 'height-contentIOS' : 'height-contentAnd'} relative flex flex-col pb-8`}>
          <BookShelf cover={book.cover} title={book.title} />
          <section className="flex h-[7.5rem] flex-shrink-0 flex-col items-center justify-center px-6 text-center">
            <h1
              className={`${book.title.length > 50 ? 'text-[0.9rem]' : book.title.length < 30 && 'text-lg'} font-bold`}
            >
              {book.title}
            </h1>
            <p className="m-1 text-xs opacity-70">{`저자 ${book.author}`}</p>
          </section>
          <div className="h-28 w-full px-7 pb-6 text-base font-semibold">
            책정보
            <hr className="mb-2 h-0.5 border-none bg-gray" />
            <div className="grid grid-cols-2 grid-rows-2 text-[0.815rem] font-normal">
              <p className="truncate pr-2">{`출판 : ${book.publisher}`}</p>
              <p className="truncate pr-2">{`카테고리 : ${formatBookGenre(book.genre)}`}</p>
              <p className="truncate pr-2">{`출간일 : ${yy}.${mm}.${dd}`}</p>
              <p className="truncate pr-2">{`ISBN : ${book.isbn}`}</p>
            </div>
          </div>
          <div
            className="relative h-full w-full flex-shrink overflow-hidden px-6 text-base font-semibold"
            ref={plotRef}
          >
            책소개
            {isClamped && (
              <button className="absolute right-6 text-xs opacity-70" type="button" onClick={plotOpen}>
                더보기
              </button>
            )}
            <hr className="mb-2 h-0.5 border-none bg-gray" />
            <div className={`w-full overflow-hidden break-words text-[0.815rem] ${clampLine && `${`line-clamp-4`}`}`}>
              {book.plot}
            </div>
            <div className="h-4" ref={observerTarget} />
          </div>
        </div>
        <p
          className={`absolute ${isIOS ? 'bottom-footerIOS' : 'bottom-footerAnd'} left-5 mb-2 flex items-center text-xs font-semibold opacity-50`}
        >
          <Icon Component={RecordInfo} size="xs" style={{ marginRight: '6px' }} />
          <a className="font-bold underline" href={getHttpsLink(book.link)} rel="noopener noreferrer">
            알라딘
          </a>{' '}
          에서 제공한 정보입니다.
        </p>

        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} detailId={detailId} />
        {plotIsOpen && (
          <PlotDetailModal isOpen={plotIsOpen} close={plotClose} scrollPos={plotScrollPos} plot={book.plot} />
        )}
        {isRecording && <ReadingRecordForm onClose={() => setIsRecording(false)} isbn={book.isbn} />}
      </>
    )
  );
};

export default BookDetail;
