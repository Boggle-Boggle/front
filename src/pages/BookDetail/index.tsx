import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import BookShelf from 'components/feat/BookShelf';
import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import { formatDateAndTime, formatBookJenre } from 'utils/format';
import useModal from 'hooks/useModal';
import ExistingRecordModal from './ExistingRecordModal';
import { useQuery } from '@tanstack/react-query';
import { getBookDetail, hasReadingRecord } from 'services/search';

const BookDetail = () => {
  const { isOpen, close, scrollPos, open } = useModal();
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

    // 책 등록페이지로 렌더링
    console.log('책 새로 등록');
  };

  if (!book) {
    return <div></div>;
  }

  const { yy, mm, dd } = formatDateAndTime(book.pubDate);
  return (
    book && (
      <div className="height-without-header flex flex-col">
        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} />
        <Header
          leftBtn={{
            icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
            handleLeftBtnClick: handleGoBack,
          }}
        />
        <div className="flex flex-col items-center">
          <img src={book.cover} alt={`${book.title} 커버`} className="z-10 h-[234px] w-[167px]" />
          <BookShelf />
        </div>
        <div className="pb-7 pt-6 text-center">
          <h1 className="text-lg font-bold">{book.title}</h1>
          <p className="text-xs text-sub">{`저자 ${book.author}`}</p>
        </div>
        <section className="flex w-full grow flex-col items-center px-7 pb-9">
          <p className="w-full pb-4 text-base font-semibold">
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
      </div>
    )
  );
};

export default BookDetail;
