import { useReducer, useState } from 'react';

import Alert from 'components/Alert';
import Button from 'components/Button';
import HalfScreenModal from 'components/HalfScreenModal';
import DateSelector from 'pages/BookDetail/ReadingRecordForm/shared/DateSelector';

import { formatDate, isValidDate } from 'utils/format';

import { DateType, RecordDate, StatusType } from 'types/record';

type AddReadingDateModalProps = {
  readDates: (RecordDate & { status: StatusType })[];
  setReadDates: React.Dispatch<React.SetStateAction<(RecordDate & { status: StatusType })[]>>;
  close: () => void;
};

const AddReadingDateModal = ({ readDates, setReadDates, close }: AddReadingDateModalProps) => {
  const [selected, setSelected] = useState<'reading' | 'complete'>('complete');
  const [startDate, setStartDate] = useState<DateType>(null);
  const [endDate, setEndDate] = useState<DateType>(null);
  const [isChangingStartDate, setIsChangeStartDate] = useState<boolean>(false);
  const [isChangingEndDate, setIsChangeEndDate] = useState<boolean>(false);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const handleAddReadingDate = async () => {
    if (selected === 'reading') {
      if (!startDate) {
        handleAlertActive();
        return;
      }

      if (!isValidDate(...startDate)) {
        handleAlertActive();
        return;
      }

      const newReadDate: RecordDate & { status: StatusType } = {
        readDateId: null,
        status: 'reading',
        startReadDate: formatDate(...startDate),
        endReadDate: null,
      };

      setReadDates([...readDates, newReadDate]);

      close();

      return;
    }

    if (!startDate || !endDate) {
      handleAlertActive();

      return;
    }

    if (!isValidDate(...endDate)) {
      handleAlertActive();
      return;
    }

    const start = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    const end = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    if (start <= end) {
      const newReadDate: RecordDate & { status: StatusType } = {
        readDateId: null,
        status: 'completed',
        startReadDate: formatDate(...startDate),
        endReadDate: formatDate(...endDate),
      };

      setReadDates([...readDates, newReadDate]);

      close();
    } else handleAlertActive();
  };

  return (
    <>
      {isAlertActive && <Alert message="올바르지 않은 날짜에요" onClose={handleAlertActive} />}
      {!isChangingStartDate && !isChangingEndDate && (
        <HalfScreenModal bgColor="bg-white" handleClose={close}>
          <section className="relative flex h-full w-full flex-col p-6">
            <p className="pb-1 text-center text-lg font-bold">독서기간 추가</p>
            <p className="text-center text-sm opacity-50">진행도를 선택한 뒤 기간을 입력해보세요</p>
            <div className="h-full w-full">
              <p className="pb-1 pt-2 text-lg font-bold">진행도</p>
              <div className="flex w-full justify-between text-sm">
                <button
                  className={`flex h-[4.5rem] w-[48%] flex-col justify-around rounded-[10px] border-2 px-4 py-2 ${selected === 'complete' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-main'}`}
                  type="button"
                  onClick={() => setSelected('complete')}
                >
                  다 읽은 책이에요
                </button>
                <button
                  className={`flex h-[4.5rem] w-[48%] flex-col justify-around rounded-[10px] border-2 px-4 py-2 ${selected === 'reading' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-main'}`}
                  type="button"
                  onClick={() => setSelected('reading')}
                >
                  읽는 중인 책이에요
                </button>
              </div>

              <p className="pb-1 pt-4 text-lg font-bold">독서기간</p>
              <section>
                <button
                  className="mb-4 flex w-full items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm"
                  onClick={() => setIsChangeStartDate(true)}
                  type="button"
                >
                  {startDate ? (
                    <>
                      <div>
                        <span className="ml-2 opacity-60">읽기 시작한 날</span>
                      </div>
                      <div className="text-base">
                        {`${startDate[0] >= 2000 ? startDate[0] : 2000 + startDate[0]}년 ${startDate[1]}월 ${startDate[2]}일`}
                      </div>
                    </>
                  ) : (
                    <p className="opacity-50">책을 읽기 시작한 날짜를 입력해주세요</p>
                  )}
                </button>

                {selected === 'reading' ? (
                  <div className="mb-4 flex items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm">
                    <div>
                      <span className="ml-2 opacity-60">다 읽은 날</span>
                    </div>
                    <div className="text-base">미정</div>
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
                          <span className="ml-2 opacity-60">다 읽은 날</span>
                        </div>
                        <div className="text-base">
                          {`${endDate[0] >= 2000 ? endDate[0] : 2000 + endDate[0]}년 ${endDate[1]}월 ${endDate[2]}일`}
                        </div>
                      </>
                    ) : (
                      <p className="opacity-50">책을 다 읽은 날짜를 입력해주세요</p>
                    )}
                  </button>
                )}
              </section>
            </div>
            <Button handleClick={handleAddReadingDate} className="mt-4 w-full text-white">
              완료
            </Button>
          </section>
        </HalfScreenModal>
      )}

      {isChangingStartDate && (
        <HalfScreenModal>
          <div className="fixed bottom-0 z-30 m-auto h-1/2 w-full max-w-screen-sm">
            <DateSelector
              initialDate={startDate}
              setDate={setStartDate}
              type="시작"
              setIsChangeDate={setIsChangeStartDate}
            />
          </div>
        </HalfScreenModal>
      )}

      {isChangingEndDate && (
        <HalfScreenModal>
          <div className="fixed bottom-0 z-30 m-auto h-1/2 w-full max-w-screen-sm">
            <DateSelector initialDate={endDate} setDate={setEndDate} type="종료" setIsChangeDate={setIsChangeEndDate} />
          </div>
        </HalfScreenModal>
      )}
    </>
  );
};

export default AddReadingDateModal;
