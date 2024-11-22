import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import { DateType, StatusType } from 'types/record';

import Status from './Status';
import Rating from './Rating';
import ReadingDate from './ReadingDate';
import Library from './Library';
import Visiable from './Visible';
import Complete from './Complete';

type StepType = '상태' | '별점' | '날짜' | '서재' | '숨기기' | '완료';

type ReadingRecordFormProps = {
  onClose: () => void;
};

const ReadingRecordForm = ({ onClose }: ReadingRecordFormProps) => {
  const [step, setStep] = useState<StepType>('상태');

  const [selectedStatus, setSelectedStatus] = useState<StatusType>('reading');
  const [rating, setRating] = useState<number>(5);
  const [startDate, setStartDate] = useState<DateType>(null);
  const [endDate, setEndDate] = useState<DateType>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<number[]>([]);
  const [status, setStatus] = useState<boolean>(false);

  return (
    <>
      <div className="absolute z-20 h-full w-full bg-black opacity-40" onClick={onClose} />
      <section className="fixed bottom-0 z-30 h-auto w-full rounded-t-2xl bg-main p-9">
        {step === '상태' && (
          <Status onNext={() => setStep('별점')} selected={selectedStatus} setSelected={setSelectedStatus} />
        )}
        {step === '별점' && (
          <Rating onPrev={() => setStep('상태')} onNext={() => setStep('날짜')} rating={rating} setRating={setRating} />
        )}
        {step === '날짜' && (
          <ReadingDate
            onPrev={() => setStep('별점')}
            onNext={() => setStep('서재')}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
        {step === '서재' && (
          <Library
            onPrev={() => setStep('날짜')}
            onNext={() => setStep('숨기기')}
            selected={selectedLibrary}
            setSelected={setSelectedLibrary}
          />
        )}
        {step === '숨기기' && (
          <Visiable
            onPrev={() => setStep('서재')}
            onNext={() => setStep('완료')}
            status={status}
            setStatus={setStatus}
          />
        )}
        {step === '완료' && <Complete />}
        <button type="button" onClick={onClose} className="absolute right-3 top-3">
          <FaXmark style={{ width: '20px', height: '20px' }} />
        </button>
      </section>
    </>
  );
};

export default ReadingRecordForm;
