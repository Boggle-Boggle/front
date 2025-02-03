import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import { getEditRecord, updateEditRecord } from 'services/record';

import { RecordDate, RecordLibraries, StatusType, UpdateRecordParams } from 'types/record';

import { CommonBack } from 'assets/icons';

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
  const navigate = useNavigate();
  const { title } = location.state;

  const { recordId = '' } = useParams();
  const { isIOS } = useDevice();

  const { data } = useQuery({ queryKey: ['edit', recordId], queryFn: () => getEditRecord(recordId) });

  const handleSave = () => {
    if (!data) return;

    const newRecord: Partial<UpdateRecordParams> = {};

    newRecord.readDateList = readDates;

    const librariesId = libraries.filter((library) => library.selected).map((library) => library.libraryId);
    newRecord.libraryIdList = librariesId;

    if (rating !== data.rating) newRecord.rating = rating;
    if (isVisible !== data.isBookVisible) newRecord.isVisible = isVisible;

    updateEditRecord(Number(recordId), newRecord);

    navigate(`/record/${recordId}`, { replace: true });
  };

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
        leftBtn={
          <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
            <Icon Component={CommonBack} />
          </button>
        }
        rightBtn={
          <button className="font-semibold text-accent" type="button" onClick={handleSave}>
            저장
          </button>
        }
      />

      {data && (
        <section className={`${isIOS ? 'height-contentIOS' : 'height-contentAnd'} overflow-y-scroll pb-20`}>
          <EditReadingDate recordId={Number(recordId)} readDates={readDates} />
          <EditLibraries libraries={libraries!} setLibraries={setLibraries} />
          <EditRating rating={rating} setRating={setRating} />
          <EditVisible isVisible={isVisible} setIsVisible={setIsVisible} />
        </section>
      )}
    </div>
  );
};

export default Edit;
