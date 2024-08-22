import { useState } from 'react';
import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import SearchHistory from 'components/feat/SearchHistory';
import Header from 'components/ui/Header';
import SearchBar from 'components/ui/SearchBar';
import SearchBookResult from 'layouts/Search/SearchBookResult';

type Book = {
  title: string;
  isbn: string;
  author: string;
  pubDate: string;
  cover: string;
  publisher: string;
};

const bookList = [
  {
    title: '파과 (리커버)',
    isbn: '9791162203620',
    author: '구병모 (지은이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/33728/6/cover200/k262939544_2.jpg',
    publisher: '위즈덤하우스',
  },
  {
    title: '[세트] 파과 (리커버) + 파쇄 - 전2권',
    isbn: '',
    author: '구병모 (지은이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/33728/17/cover200/k552939544_2.jpg',
    publisher: '위즈덤하우스',
  },
  {
    title: '[세트] 파과 + 아가미 + 한 스푼의 시간 (리커버) - 전3권',
    isbn: '',
    author: '구병모 (지은이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/33728/59/cover200/k322939545_2.jpg',
    publisher: '위즈덤하우스',
  },
  {
    title: '파과',
    isbn: '9788991406032',
    author: '전영학 (지은이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/4553/32/cover200/8991406033_1.jpg',
    publisher: '고두미',
  },
  {
    title: '파가니니 플루트 24 카프리스 Op.1',
    isbn: '9788972269403',
    author: '파가니니 (Nicolo Paganini) (지은이), J. Hermann, C. Roddriges (엮은이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/5620/33/cover200/8972269409_1.jpg',
    publisher: '한국음악사',
  },
  {
    title: '식물 바이오테크놀로지 - 파란 장미도 꿈만은 아니다',
    isbn: '9788970445335',
    author: '스즈키 마사히코 (지은이), 안용근, 이종수 (옮긴이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/34085/43/cover200/8970445331_1.jpg',
    publisher: '전파과학사',
  },
  {
    title: '지구란 무엇인가 - 그 탄생과 구조의 수수께끼를 탐색한다, 개정판',
    isbn: '9788970446691',
    author: '다케우치 히토시 (지은이), 원종관, 전경숙 (옮긴이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/34454/40/cover200/8970446699_1.jpg',
    publisher: '전파과학사',
  },
  {
    title: 'GSI 중력파 과학수사대',
    isbn: '9791197047534',
    author: '오정근 (지은이), 정은규 (그림)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/24818/6/cover200/k902631030_1.jpg',
    publisher: '동아시아사이언스',
  },
  {
    title: '생명의 탄생 - 원시생물로의 물질의 진화',
    isbn: '9788970446578',
    author: '오시마 타이로 (지은이), 백태홍 (옮긴이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/34003/61/cover200/8970446575_1.jpg',
    publisher: '전파과학사',
  },
  {
    title: '과학적 신념은 어디에서 오는가 - 막스 플랑크의 물리 철학',
    isbn: '9788970449074',
    author: '막스 플랑크 (지은이), 이정호 (옮긴이)',
    pubDate: '2022-10-20T10:10:10',
    cover: 'https://image.aladin.co.kr/product/21290/99/cover200/8970449078_1.jpg',
    publisher: '전파과학사',
  },
];

const Search = () => {
  const [value, setValue] = useState<string>('');
  const [bookData, setBookData] = useState<null | Book[]>([]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReadBarcode = () => {};

  const handleSubmit = () => {
    console.log('API 요청');
  };

  return (
    <div className="relative h-screen bg-[#DCD7D6]">
      <Header
        title={{ text: '도서 검색' }}
        leftBtn={{
          icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick: handleGoBack,
        }}
        rightBtn={{
          icon: <BiScan style={{ width: '24px', height: '24px' }} />,
          handleRightBtnClick: handleReadBarcode,
        }}
      />
      <SearchBar
        placeholder="읽고 싶은 책을 검색해 보세요!"
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
      {bookData !== null ? (
        <ul className="height-content absolute bottom-0 mb-[80px] w-full overflow-y-auto rounded-tl-3xl bg-white p-6">
          {bookData.length > 0 ? (
            bookData.map((book) => (
              <li>
                <SearchBookResult book={book} />
                <hr />
              </li>
            ))
          ) : (
            <div>아이템 없슴!~!!</div>
          )}
        </ul>
      ) : (
        <>
          <SearchHistory />
          <div className="flex flex-col items-center justify-center pt-28">
            <TbCameraSearch style={{ width: '137px', height: '137px', opacity: '30%' }} />
            <p className="pt-4 text-center">
              오른쪽 상단의 아이콘을 클릭하면 <br />
              바코드 검색이 가능합니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
