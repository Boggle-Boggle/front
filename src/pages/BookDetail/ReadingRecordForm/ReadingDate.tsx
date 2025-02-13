import { useReducer, useState } from 'react';

import Alert from 'components/Alert';
import Icon from 'components/Icon';

import { isValidDate } from 'utils/format';

import { DateType } from 'types/record';

import { RecordPeriod, RecordSelectDate, CommonNext } from 'assets/icons';

import ButtonSet from './shared/ButtonSet';
import DateSelector from './shared/DateSelector';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type DateProps = {
  isReading: boolean;
  startDate: DateType;
  endDate: DateType;
  setStartDate: React.Dispatch<React.SetStateAction<DateType>>;
  setEndDate: React.Dispatch<React.SetStateAction<DateType>>;
  onPrev: () => void;
  onNext: () => void;
};

const ReadingDate = ({ isReading, startDate, endDate, setStartDate, setEndDate, onPrev, onNext }: DateProps) => {
  const [isChangingStartDate, setIsChangeStartDate] = useState<boolean>(false);
  const [isChangingEndDate, setIsChangeEndDate] = useState<boolean>(false);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const handleNext = () => {
    if (!isReading) {
      if (!startDate || !endDate) {
        handleAlertActive();

        return;
      }

      if (!isValidDate(...startDate) || !isValidDate(...endDate)) {
        handleAlertActive();
        return;
      }

      const start = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      const end = new Date(endDate[0], endDate[1] - 1, endDate[2]);

      if (start <= end) onNext();
      else handleAlertActive();

      return;
    }

    if (!startDate) {
      handleAlertActive();

      return;
    }

    if (!isValidDate(...startDate)) {
      handleAlertActive();
      return;
    }

    onNext();
  };

  return (
    <>
      {isAlertActive && <Alert message="올바르지 않은 날짜에요" onClose={handleAlertActive} />}
      <Title message="책을 언제 읽었나요?" />
      <SubTitle message="읽기 시작한 날짜와 다 읽은 날짜를 입력해주세요" />

      <section>
        <button
          className="mb-4 flex w-full items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm"
          onClick={() => setIsChangeStartDate(true)}
          type="button"
        >
          {startDate ? (
            <>
              <div>
                <Icon Component={RecordSelectDate} size="lg" style={{ color: '#E6B9A6', display: 'inline-block' }} />
                <span className="ml-2 opacity-60">읽기 시작한 날</span>
              </div>
              <div className="flex items-center text-base">
                {`${startDate[0] >= 2000 ? startDate[0] : 2000 + startDate[0]}년 ${startDate[1]}월 ${startDate[2]}일`}
                <Icon Component={CommonNext} style={{ width: '16px', display: 'inline-block' }} />
              </div>
            </>
          ) : (
            <>
              <p className="opacity-50">책을 읽기 시작한 날짜를 입력해주세요</p>
              <Icon Component={RecordPeriod} size="lg" style={{ color: '#E6B9A6' }} />
            </>
          )}
        </button>

        {isReading ? (
          <div className="mb-4 flex items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm">
            <div>
              <Icon Component={RecordSelectDate} size="lg" style={{ color: '#E6B9A6', display: 'inline-block' }} />

              <span className="ml-2 opacity-60">다 읽은 날</span>
            </div>
            <div className="flex items-center text-base">
              미정
              <Icon Component={CommonNext} style={{ width: '16px', display: 'inline-block' }} />
            </div>
          </div>
        ) : (
          <button
            className="mb-4 flex w-full items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm"
            onClick={() => setIsChangeEndDate(true)}
            type="button"
          >
            {endDate ? (
              <>
                <div>
                  <Icon Component={RecordSelectDate} size="lg" style={{ color: '#E6B9A6', display: 'inline-block' }} />
                  <span className="ml-2 opacity-60">다 읽은 날</span>
                </div>
                <div className="flex items-center text-base">
                  {`${endDate[0] >= 2000 ? endDate[0] : 2000 + endDate[0]}년 ${endDate[1]}월 ${endDate[2]}일`}
                  <Icon Component={CommonNext} style={{ width: '16px' }} />
                </div>
              </>
            ) : (
              <>
                <p className="opacity-50">책을 다 읽은 날짜를 입력해주세요</p>
                <Icon Component={RecordPeriod} size="lg" style={{ color: '#E6B9A6' }} />
              </>
            )}
          </button>
        )}
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
