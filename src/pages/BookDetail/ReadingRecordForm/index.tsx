import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import { getLibraries } from 'services/library';
import { formatDate } from 'utils/format';

import { DateType, RatingTitleType, StatusType } from 'types/record';

import Complete from './Complete';
import Libraries from './Libraries';
import Rating from './Rating';
import ReadingDate from './ReadingDate';
import Status from './Status';
import Visible from './Visible';

type StepType = '상태' | '별점' | '날짜' | '서재' | '숨기기' | '완료';

type ReadingRecordFormProps = {
  isbn: string;
  onClose: () => void;
};

const ReadingRecordForm = ({ isbn, onClose }: ReadingRecordFormProps) => {
  const [step, setStep] = useState<StepType>('상태');

  const [selectedStatus, setSelectedStatus] = useState<StatusType>('completed');
  const [rating, setRating] = useState<number>(5);
  const [ratingTitle, setRatingTitle] = useState<RatingTitleType>('최고예요');
  const [startDate, setStartDate] = useState<DateType>(null);
  const [endDate, setEndDate] = useState<DateType>(null);
  const [selectedLibraries, setSelectedLibraries] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const createRecord = () => {
    return {
      isbn,
      readStatus: selectedStatus,
      rating: selectedStatus === 'completed' ? rating : null,
      startReadDate: startDate ? formatDate(startDate[0], startDate[1], startDate[2]) : null,
      endReadDate: endDate ? formatDate(endDate[0], endDate[1], endDate[2]) : null,
      libraryIdList: selectedLibraries,
      isVisible,
    };
  };

  const { data: libraries } = useQuery({
    queryKey: ['libraries'],
    queryFn: () => getLibraries(),
  });

  return (
    <>
      <button
        className="absolute top-0 z-20 h-full w-full bg-black opacity-40"
        onClick={onClose}
        aria-label="취소"
        type="button"
      />
      <section className="fixed bottom-0 z-30 h-auto w-full rounded-t-2xl bg-main p-7">
        {step === '상태' && (
          <Status
            onNext={() => {
              if (selectedStatus === 'completed') setStep('별점');
              else setStep('서재');
            }}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
        )}
        {step === '별점' && (
          <Rating
            onPrev={() => setStep('상태')}
            onNext={() => setStep('날짜')}
            rating={rating}
            setRating={setRating}
            status={ratingTitle}
            setStatus={setRatingTitle}
          />
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
        {step === '서재' && libraries && (
          <Libraries
            libraries={libraries.libraryList}
            onPrev={() => {
              if (selectedStatus === 'completed') setStep('날짜');
              else setStep('상태');
            }}
            onNext={() => setStep('숨기기')}
            selected={selectedLibraries}
            setSelected={setSelectedLibraries}
          />
        )}
        {step === '숨기기' && (
          <Visible
            onPrev={() => setStep('서재')}
            onNext={() => setStep('완료')}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        )}
        {step === '완료' && <Complete record={createRecord()} />}
        <button type="button" onClick={onClose} className="absolute right-3 top-3" aria-label="책 저장하기">
          <FaXmark style={{ width: '20px', height: '20px' }} />
        </button>
      </section>
    </>
  );
};

export default ReadingRecordForm;
