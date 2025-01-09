import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';

import Header from 'components/Header';

import { getEditRecord } from 'services/record';

import { RecordDate, RecordLibraries, StatusType } from 'types/record';

import EditLibraries from './EditLibraries';
import EditRating from './EditRating';
import EditReadingDate from './EditReadingDate';
import EditVisible from './EditVisible';

const Edit = () => {
  const [readDates, setReadDates] = useState<(RecordDate & { status: StatusType })[]>([]);
  const [libraries, setLibraries] = useState<(RecordLibraries & { selected: boolean })[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const location = useLocation();
  const { title } = location.state;

  const { recordId = '' } = useParams();

  const { data } = useQuery({ queryKey: ['edit', recordId], queryFn: () => getEditRecord(recordId) });

  useEffect(() => {
    if (!data) return;

    setReadDates(data.readDateList);
    setLibraries(data.libraries);
    setRating(data.rating);
    setIsVisible(data.isBookVisible);
  }, [data]);

  return (
    <div className="bg-white">
      <Header
        title={<p className={`${title.length > 20 ? 'text-sm' : 'text-base'}`}>{title}</p>}
        leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={() => {}} />}
        rightBtn={<span className="text-accent">저장</span>}
      />

      {data && (
        <section className="height-content overflow-y-scroll pb-4">
          <EditReadingDate readDates={readDates} />
          <EditLibraries libraries={libraries!} setLibraries={setLibraries} />
          <EditRating rating={rating} setRating={setRating} />
          <EditVisible isVisible={isVisible} setIsVisible={setIsVisible} />
        </section>
      )}
    </div>
  );
};

export default Edit;
