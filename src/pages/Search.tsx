import { BiScan } from 'react-icons/bi';
import { IoArrowBackOutline } from 'react-icons/io5';

import Header from 'components/ui/Header';

const Search = () => {
  const handleBack = () => {};
  const handleReadBarcode = () => {};
  return (
    <>
      <Header
        title={{ text: '도서 검색' }}
        leftBtn={{
          icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick: handleBack,
        }}
        rightBtn={{
          icon: <BiScan style={{ width: '24px', height: '24px' }} />,
          handleRightBtnClick: handleReadBarcode,
        }}
      />
      검색결과페이지
    </>
  );
};

export default Search;
