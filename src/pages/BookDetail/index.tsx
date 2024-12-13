import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import useModal from 'hooks/useModal';
import { getBookDetail, hasReadingRecord } from 'services/search';
import { formatDateAndTime, formatBookJenre } from 'utils/format';

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

  const handleSaveBook = async () => {
    const readingRecord = await hasReadingRecord(detailId);

    if (readingRecord) {
      open();

      return;
    }

    setIsRecording(true);
  };

  if (!book) {
    return <div>{/* TODO : 책이 없음 페이지 표시 + 책 직접 등록 */}</div>;
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
        <section className="p-6 text-center">
          <h1 className={`${book.title.length > 50 ? 'text-[0.9rem]' : book.title.length < 30 && 'text-lg'} font-bold`}>
            {book.title}
          </h1>
          <p className="m-1 text-xs text-sub">{`저자 ${book.author}`}</p>
        </section>
        <section className="flex w-full grow flex-col items-center px-7 pb-9">
          <div className="w-full pb-6 text-base font-semibold">
            책정보
            <hr className="mb-2 h-0.5 border-none bg-gray" />
            <div className="grid grid-cols-2 grid-rows-2 text-[0.8rem] font-normal">
              <p className="truncate pr-2">{`출판 : ${book.publisher}`}</p>
              <p className="truncate pr-2">{`카테고리 : ${formatBookJenre(book.genre)}`}</p>
              <p className="truncate pr-2">{`발행 : ${yy}.${mm}.${dd}`}</p>
              <p className="truncate pr-2">{`ISBN : ${book.isbn}`}</p>
            </div>
          </div>
          <div className="relative grow text-base font-semibold">
            줄거리
            <span className="absolute right-0 text-xs text-sub">더보기</span>
            <hr className="mb-2 h-0.5 border-none bg-gray" />
            <div className="max-h-[100px] bg-slate-500 text-[13px] font-normal">{book.plot}</div>
          </div>
          <Button handleClick={handleSaveBook}>책 저장하기</Button>
        </section>
        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} />
        {isRecording && <ReadingRecordForm onClose={() => setIsRecording(false)} isbn={book.isbn} />}
      </div>
    )
  );
};

export default BookDetail;
