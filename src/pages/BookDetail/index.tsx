import { useQuery } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';

import useModal from 'hooks/useModal';
import { getBookDetail, hasReadingRecord } from 'services/search';
import { formatDateAndTime, formatBookGenre } from 'utils/format';

import BookShelf from './BookShelf';
import ExistingRecordModal from './ExistingRecordModal';
import PlotDetailModal from './PlotDetailModal';
import ReadingRecordForm from './ReadingRecordForm';

const BookDetail = () => {
  const { isOpen, close, scrollPos, open } = useModal();
  const { isOpen: plotIsOpen, scrollPos: plotScrollPos, close: plotClose, open: plotOpen } = useModal();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isClamped, setIsClamped] = useState<boolean>(true);
  const [clampLine, setClampLine] = useState<number | null>(4);

  const plotRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { detailId = '' } = useParams();

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
    if (plotRef.current && buttonRef.current) {
      const plot = plotRef.current.getBoundingClientRect();
      const button = buttonRef.current.getBoundingClientRect();

      if (plot.bottom > button.top - 10) {
        setIsClamped(true);
        if (button.top - plot.top < 110) setClampLine(3);
        else if (button.top - plot.top < 125) setClampLine(4);
        else setClampLine(5);
      } else {
        setIsClamped(false);
        setClampLine(null);
      }
    }
  }, [book]);

  // TODO : notFound
  if (!book) return;

  const { yy, mm, dd } = formatDateAndTime(book.pubDate);

  return (
    book && (
      <>
        <Header leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={handleGoBack} />} />

        <div className="flex h-[calc(100%_-_13rem)] flex-col overflow-hidden pb-4">
          <BookShelf cover={book.cover} title={book.title} />
          <section className="flex h-36 flex-shrink-0 flex-col items-center justify-center px-6 pt-6 text-center">
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

          <div className="relative w-full flex-shrink overflow-hidden px-6 text-base font-semibold">
            줄거리
            {isClamped && (
              <button className="absolute right-6 text-xs opacity-70" type="button" onClick={plotOpen}>
                더보기
              </button>
            )}
            <hr className="mb-2 h-0.5 border-none bg-gray" />
            <div
              className={`w-full break-words text-[0.815rem] ${isClamped ? `line-clamp-${clampLine} ` : ''} `}
              ref={plotRef}
            >
              {book.plot}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 px-6" ref={buttonRef}>
          <Button handleClick={handleSaveBook}>책 저장하기</Button>
        </div>
        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} />
        {plotIsOpen && (
          <PlotDetailModal isOpen={plotIsOpen} close={plotClose} scrollPos={plotScrollPos} plot={book.plot} />
        )}
        {isRecording && <ReadingRecordForm onClose={() => setIsRecording(false)} isbn={book.isbn} />}
      </>
    )
  );
};

export default BookDetail;
