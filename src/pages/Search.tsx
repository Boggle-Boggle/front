import { useState } from 'react';
import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import SearchHistory from 'components/feat/SearchHistory';
import Header from 'components/ui/Header';
import SearchBar from 'components/ui/SearchBar';
import SearchBookResult from 'layouts/Search/SearchBookResult';

import { Book } from 'types/book';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const [books, setBooks] = useState<null | Book[]>([]);
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
      {books !== null ? (
        <ul className="height-content absolute bottom-0 mb-[80px] w-full overflow-y-auto rounded-tl-3xl bg-white p-6">
          {books.length > 0 ? (
            books.map((book) => (
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
