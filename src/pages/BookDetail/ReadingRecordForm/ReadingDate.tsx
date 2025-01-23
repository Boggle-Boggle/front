import { useState } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { LuCalendarCheck2 } from 'react-icons/lu';

import { DateType } from 'types/record';

import ButtonSet from './shared/ButtonSet';
import DateSelector from './shared/DateSelector';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type DateProps = {
  startDate: DateType;
  endDate: DateType;
  setStartDate: React.Dispatch<React.SetStateAction<DateType>>;
  setEndDate: React.Dispatch<React.SetStateAction<DateType>>;
  onPrev: () => void;
  onNext: () => void;
};

const ReadingDate = ({ startDate, endDate, setStartDate, setEndDate, onPrev, onNext }: DateProps) => {
  const [isChangingStartDate, setIsChangeStartDate] = useState<boolean>(false);
  const [isChangingEndDate, setIsChangeEndDate] = useState<boolean>(false);

  const handleNext = () => {
    if (!startDate || !endDate) {
      alert('날짜를 선택해주세요');

      return;
    }

    const start = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    const end = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    if (start <= end) {
      onNext();
    } else {
      alert('종료날짜는 시작날짜 이후여야 합니다.');
    }
  };

  return (
    <>
      <Title message="책을 언제 읽었나요?" />
      <SubTitle message="읽기 시작한 날짜와 다 읽은 날짜를 입력해주세요" />

      <section>
        <div
          className="mb-4 flex items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm"
          onClick={() => setIsChangeStartDate(true)}
        >
          {startDate ? (
            <>
              <div>
                <LuCalendarCheck2
                  style={{ width: '30px', height: '30px', color: '#E6B9A6', display: 'inline-block' }}
                />
                <span className="ml-2 opacity-60">읽기시작한날</span>
              </div>
              <div className="text-base">
                {`${startDate[0]}년 ${startDate[1]}월 ${startDate[2]}일`}
                <GoChevronRight style={{ display: 'inline-block' }} />
              </div>
            </>
          ) : (
            <>
              <p className="opacity-50">책을 읽기 시작한 날짜를 입력해주세요</p>
              <LuCalendarCheck2 style={{ width: '30px', height: '30px', color: '#E6B9A6' }} />
            </>
          )}
        </div>

        <div
          className="mb-4 flex items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm"
          onClick={() => setIsChangeEndDate(true)}
        >
          {endDate ? (
            <>
              <div>
                <LuCalendarCheck2
                  style={{ width: '30px', height: '30px', color: '#E6B9A6', display: 'inline-block' }}
                />
                <span className="ml-2 opacity-60">다 읽은 날</span>
              </div>
              <div className="text-base">
                {`${endDate[0]}년 ${endDate[1]}월 ${endDate[2]}일`}
                <GoChevronRight style={{ display: 'inline-block' }} />
              </div>
            </>
          ) : (
            <>
              <p className="opacity-50">책을 다 읽은 날짜를 입력해주세요</p>
              <LuCalendarCheck2 style={{ width: '30px', height: '30px', color: '#E6B9A6' }} />
            </>
          )}
        </div>
      </section>

      <ButtonSet onPrev={onPrev} onNext={handleNext} />

      {isChangingStartDate && (
        <DateSelector
          initialDate={startDate}
          setDate={setStartDate}
          type="시작"
          setIsChangeDate={setIsChangeStartDate}
        />
      )}

      {isChangingEndDate && (
        <DateSelector initialDate={endDate} setDate={setEndDate} type="종료" setIsChangeDate={setIsChangeEndDate} />
      )}
    </>
  );
};

export default ReadingDate;
