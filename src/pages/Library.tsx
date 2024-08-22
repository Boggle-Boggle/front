import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Header from 'components/ui/Header';

const Library = () => {
  const navigate = useNavigate();
  const handleAddBook = () => {
    navigate('/search');
  };

  const handleToggle = () => {
    console.log('책 검색 페이지로 이동');
  };

  return (
    <>
      <Header
        leftBtn={{
          icon: <HiPlus style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick: handleAddBook,
        }}
        rightBtn={{
          icon: <BsThreeDotsVertical style={{ width: '24px', height: '24px' }} />,
          handleRightBtnClick: handleToggle,
        }}
        title={{ text: '전체보기' }}
      />
      서재
    </>
  );
};

export default Library;
