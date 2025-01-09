import { IoArrowBackOutline } from 'react-icons/io5';

import Header from 'components/Header';

import Libraries from './Libraries';
import Rating from './Rating';
import ReadingDate from './ReadingDate';
import Visible from './Visible';

const Edit = () => {
  return (
    <div className="bg-white">
      <Header
        title={<>파과(구병모 장편소설)</>}
        leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={() => {}} />}
        rightBtn={<span className="text-accent">저장</span>}
      />

      <section className="height-content overflow-y-scroll pb-4">
        <ReadingDate />
        <Libraries />
        <Rating />
        <Visible />
      </section>
    </div>
  );
};

export default Edit;
