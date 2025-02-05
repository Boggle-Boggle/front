import { useQuery } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';
import { getBookDetail, hasReadingRecord } from 'services/search';
import { formatDateAndTime, formatBookGenre } from 'utils/format';

import { RecordInfo, CommonBack } from 'assets/icons';

import BookShelf from './BookShelf';
import ExistingRecordModal from './ExistingRecordModal';
import PlotDetailModal from './PlotDetailModal';
import ReadingRecordForm from './ReadingRecordForm';

// 책을 검색한 후 책의 상세데이터를 볼 수 있는 페이지
const BookDetail = () => {
  // 귀찮아서 하나만 이름바꿨음 ..;
  // 책을 서재에 저장할 때 책이 있는 경우 안내해주느 모들
  const { isOpen, close, scrollPos, open } = useModal();
  // 더보기 모달 추후 제거 예정
  const { isOpen: plotIsOpen, scrollPos: plotScrollPos, close: plotClose, open: plotOpen } = useModal();

  // 책을 서재에 기록중인지를 나타내는 상태
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

  // 책의 상세정보를 받아오는 쿼리
  const { data: book } = useQuery({
    queryKey: ['bookDetail', detailId],
    queryFn: () => getBookDetail(detailId),
  });

  // 책 저장 버튼
  // 이미 기록이 되어있으면, 모달을 열어 사용자에게 안내
  // 첫 기록이라면 상태값을 기록중으로 바꾸고 기록프로세스 진행
  const handleSaveBook = async () => {
    const readingRecord = await hasReadingRecord(detailId);

    if (readingRecord) {
      open();

      return;
    }

    setIsRecording(true);
  };

  // 책정보 아래의 빈 영역이 감지 되면 clamp를 적용하는 trash 로직
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

  // clamp가 적용되면 clampLine을 측정하는 trash 로직
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
          {/* 책 썸네일 + 선반 */}
          <BookShelf cover={book.cover} title={book.title} />
          {/* 책 제목 및 저자 */}
          <section className="flex h-[7.5rem] flex-shrink-0 flex-col items-center justify-center px-6 text-center">
            <h1
              className={`${book.title.length > 50 ? 'text-[0.9rem]' : book.title.length < 30 && 'text-lg'} font-bold`}
            >
              {book.title}
            </h1>
            <p className="m-1 text-xs opacity-70">{`저자 ${book.author}`}</p>
          </section>

          {/* 책 상세조회 */}
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

          {/* 책 소개영역(수정예정) */}
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

        {/* 하단의 알라딘 api 제공 안내 영역  */}
        <p
          className={`absolute ${isIOS ? 'bottom-footerIOS' : 'bottom-footerAnd'} left-5 mb-2 flex items-center text-xs font-semibold opacity-50`}
        >
          <Icon Component={RecordInfo} size="xs" style={{ marginRight: '6px' }} />
          <a className="font-bold underline" href={book.link}>
            알라딘
          </a>{' '}
          에서 제공한 정보입니다.
        </p>

        {/* 책 등록 버튼을 눌렀을 때 책이 존재한다면 이전 기록이 있다고 알려주는 모달 */}
        <ExistingRecordModal isOpen={isOpen} close={close} scrollPos={scrollPos} detailId={detailId} />
        {/* 더보기 모달(삭제예정) */}
        {plotIsOpen && (
          <PlotDetailModal isOpen={plotIsOpen} close={plotClose} scrollPos={plotScrollPos} plot={book.plot} />
        )}
        {/* 독서기록을 추가하는 폼 */}
        {/* ? : 이런식으로 모달을 띄워주는게 맞는로직인지 궁금.. */}
        {isRecording && <ReadingRecordForm onClose={() => setIsRecording(false)} isbn={book.isbn} />}
      </>
    )
  );
};

export default BookDetail;
