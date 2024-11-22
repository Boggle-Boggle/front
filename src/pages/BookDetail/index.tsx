import { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getBookDetail, hasReadingRecord } from 'services/search';
import { formatDateAndTime, formatBookJenre } from 'utils/format';
import useModal from 'hooks/useModal';

import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import BookShelf from './BookShelf';
import ExistingRecordModal from './ExistingRecordModal';
import ReadingRecordForm from './ReadingRecordForm';

const BookDetail = () => {
  const { isOpen, close, scrollPos, open } = useModal();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const navigate = useNavigate();
  const { detailId = '' } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data: book } = useQuery({
    queryKey: ['bookDetail', detailId],
    queryFn: () => getBookDetail(detailId),
  });

  const { data: readingRecord } = useQuery({
    queryKey: ['hasRecord', detailId],
    queryFn: () => hasReadingRecord(detailId),
  });

  const handleSaveBook = () => {
    if (readingRecord) {
      open();
    }

    setIsRecording(true);
  };

  if (!book) {
    return <div></div>;
  }

  const { yy, mm, dd } = formatDateAndTime(book.pubDate);
  return (
    book && (
      <div className="height-without-header flex flex-col">
        <Header
          leftBtn={{
            icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
            handleLeftBtnClick: handleGoBack,
          }}
        />
        <BookShelf cover={book.cover} title={book.title} />
        <section className="pb-7 pt-6 text-center">
          <h1 className="text-lg font-bold">{book.title}</h1>
          <p className="text-xs text-sub">{`저자 ${book.author}`}</p>
        </section>
        <section className="flex w-full grow flex-col items-center px-7 pb-9">
          <p className="w-full pb-6 text-base font-semibold">
            책정보
            <hr className="mb-2 h-0.5 bg-sub" />
            <div className="grid grid-cols-2 grid-rows-2 text-[13px] font-normal">
              <div>{`출판 : ${book.publisher}`}</div>
              <div>{`카테고리 : ${formatBookJenre(book.genre)}`}</div>
              <div>{`발행 : ${yy}.${mm}.${dd}`}</div>
              <div>{`ISBN : ${book.isbn}`}</div>
            </div>
          </p>
          <p className="relative grow text-base font-semibold">
            줄거리
            <span className="absolute right-0 text-xs text-sub">더보기</span>
            <hr className="mb-2 h-0.5 bg-sub" />
            <div className="text-[13px] font-normal">{book.plot}</div>
          </p>
          <Button handleClick={handleSaveBook}>책 저장하기</Button>
        </section>
        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} />
        {isRecording && <ReadingRecordForm onClose={() => setIsRecording(false)} isbn={book.isbn} />}
      </div>
    )
  );
};

export default BookDetail;
