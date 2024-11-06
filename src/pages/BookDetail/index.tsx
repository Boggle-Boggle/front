import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import BookShelf from 'components/feat/BookShelf';
import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import { formatDateAndTime, formatBookJenre } from 'utils/format';

const book = {
  title: '파과 (리커버)',
  isbn: 'K262939544',
  author: '구병모 (지은이)',
  pubDate: '2018-04-16T00:00:00',
  cover: 'https://image.aladin.co.kr/product/33728/6/cover200/k262939544_2.jpg',
  publisher: '위즈덤하우스',
  jenre: '국내도서>소설/시/희곡>한국소설>2000년대 이후 한국소설',
  plot: '한국 소설에 가장 강렬하게 새겨질 새로운 여성 서사를 탄생시킨 구병모 작가의 《파과》가 새 옷을 갈아입었다. 40여 년간 날카롭고 냉혹하게 청부 살인을 업으로 삼아온 60대 여성 킬러 ‘조각(爪角)’. 몸도 기억도 예전 같지 않게 삐걱거리기 시작하면서 이제는 퇴물 취급을 받는다.',
};

const BookDetail = () => {
  const navigate = useNavigate();

  const { yy, mm, dd } = formatDateAndTime(book.pubDate);
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveBook = () => {
    console.log('책 저장하비다.');
  };

  return (
    <div className="height-without-header flex flex-col">
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
            <div>{`카테고리 : ${formatBookJenre(book.jenre)}`}</div>
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
  );
};

export default BookDetail;
