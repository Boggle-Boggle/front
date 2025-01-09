import { IoArrowBackOutline } from 'react-icons/io5';

import Header from 'components/Header';

import EditLibraries from './EditLibraries';
import EditRating from './EditRating';
import EditReadingDate from './EditReadingDate';
import EditVisible from './EditVisible';

const Edit = () => {
  return (
    <div className="bg-white">
      <Header
        title={<>파과(구병모 장편소설)</>}
        leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={() => {}} />}
        rightBtn={<span className="text-accent">저장</span>}
      />

      <section className="height-content overflow-y-scroll pb-4">
        <EditReadingDate />
        <EditLibraries />
        <EditRating />
        <EditVisible />
      </section>
    </div>
  );
};

export default Edit;
