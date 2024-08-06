import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import Header from 'components/ui/Header';

const Search = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleReadBarcode = () => {};
  return (
    <>
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
      <div>서치바</div>
      <div>최근검색어</div>
      <div className="flex flex-col items-center justify-center pt-28">
        <TbCameraSearch style={{ width: '137px', height: '137px', opacity: '30%' }} />
        <p className="pt-4 text-center">
          오른쪽 상단의 아이콘을 클릭하면 <br />
          바코드 검색이 가능합니다.
        </p>
      </div>
    </>
  );
};

export default Search;
