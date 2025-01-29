import { IoCalendarNumberOutline } from 'react-icons/io5';

import Header from 'components/Header';

import useModal from 'hooks/useModal';

import BookCase from './BookCase';
import SelectPeriodModal from './SelectPeriodModal';

const Home = () => {
  const { isOpen, close, open } = useModal();

  return (
    <>
      <Header
        backgroundColor="bg-[#CBBAB9]"
        title="2025년 전체"
        rightBtn={
          <button aria-label="기간선택" type="button" onClick={open}>
            <IoCalendarNumberOutline style={{ width: '24px', height: '24px' }} />
          </button>
        }
      />
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#CBBAB9]">
        <BookCase />
      </div>
      {isOpen && <SelectPeriodModal close={close} />}
    </>
  );
};

export default Home;
