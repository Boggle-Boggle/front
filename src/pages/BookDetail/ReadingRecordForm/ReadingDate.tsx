import { useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { GoChevronRight } from 'react-icons/go';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';
import ButtonSet from './shared/ButtonSet';

import DateSelector from './shared/DateSelector';

type DateProps = {
  onPrev: () => void;
  onNext: () => void;
};

const ReadingDate = ({ onPrev, onNext }: DateProps) => {
  const [startDate, setStartDate] = useState<[number, number, number] | null>(null);
  const [endDate, setEndDate] = useState<[number, number, number] | null>(null);
  const [isChangingStartDate, setIsChangeStartDate] = useState<boolean>(false);
  const [isChangingEndDate, setIsChangeEndDate] = useState<boolean>(false);

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

      <ButtonSet onPrev={onPrev} onNext={onNext} />

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
