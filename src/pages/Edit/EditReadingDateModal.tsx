import { useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { GrDeploy } from 'react-icons/gr';
import { LuCalendarCheck2 } from 'react-icons/lu';

import Button from 'components/Button';
import HalfScreenModal from 'components/HalfScreenModal';
import DateSelector from 'pages/BookDetail/ReadingRecordForm/shared/DateSelector';

import { updateEditRecord } from 'services/record';
import { formatDate } from 'utils/format';

import { DateType, RecordDate, StatusType } from 'types/record';

type EditReadingDateModalProps = {
  recordId: number;
  readDates: (RecordDate & { status: StatusType })[];
  close: () => void;
};

const EditReadingDateModal = ({ recordId, readDates, close }: EditReadingDateModalProps) => {
  const [selected, setSelected] = useState<'reading' | 'complete'>('complete');
  const [startDate, setStartDate] = useState<DateType>(null);
  const [endDate, setEndDate] = useState<DateType>(null);
  const [isChangingStartDate, setIsChangeStartDate] = useState<boolean>(false);
  const [isChangingEndDate, setIsChangeEndDate] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleAddReadingDate = async () => {
    if (selected === 'reading') {
      if (!startDate) {
        alert('날짜를 선택해주세요');

        return;
      }

      const newReadDate: RecordDate & { status: StatusType } = {
        readDateId: null,
        status: 'reading',
        startReadDate: formatDate(...startDate),
        endReadDate: null,
      };

      await updateEditRecord(Number(recordId), { readDateList: [...readDates, newReadDate] });
      await queryClient.invalidateQueries({ queryKey: ['edit', recordId.toString()] });

      close();

      return;
    }

    if (!startDate || !endDate) {
      alert('날짜를 선택해주세요');

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

      await updateEditRecord(Number(recordId), { readDateList: [...readDates, newReadDate] });
      await queryClient.invalidateQueries({ queryKey: ['edit', recordId.toString()] });

      close();
    } else {
      alert('종료날짜는 시작날짜 이후여야 합니다.');
    }
  };

  return (
    <>
      {!isChangingStartDate && !isChangingEndDate && (
        <HalfScreenModal bgColor="bg-white" handleClose={close}>
          <section className="relative flex h-full w-full flex-col p-6">
            <p className="pb-1 text-center text-lg font-bold">독서기간 수정</p>
            <p className="text-center text-sm opacity-50">진행도를 선택한 뒤 기간을 입력해보세요</p>
            <div className="h-full w-full">
              <p className="pb-1 pt-2 text-lg font-bold">진행도</p>
              <div className="flex w-full justify-between text-sm">
                <button
                  className={`flex h-[4.5rem] w-[48%] flex-col justify-around rounded-[10px] border-2 px-4 py-2 ${selected === 'complete' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-main'}`}
                  type="button"
                  onClick={() => setSelected('complete')}
                >
                  <GrDeploy style={{ width: '20px', height: '20px' }} />다 읽은 책이에요
                </button>
                <button
                  className={`flex h-[4.5rem] w-[48%] flex-col justify-around rounded-[10px] border-2 px-4 py-2 ${selected === 'reading' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-main'}`}
                  type="button"
                  onClick={() => setSelected('reading')}
                >
                  <GrDeploy style={{ width: '20px', height: '20px' }} />
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
                        <LuCalendarCheck2
                          style={{ width: '30px', height: '30px', color: '#E6B9A6', display: 'inline-block' }}
                        />
                        <span className="ml-2 opacity-60">읽기 시작한 날</span>
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
                </button>

                {selected === 'reading' ? (
                  <div className="mb-4 flex items-center justify-between rounded-[10px] border-2 border-accent bg-white p-4 text-sm">
                    <div>
                      <LuCalendarCheck2
                        style={{ width: '30px', height: '30px', color: '#E6B9A6', display: 'inline-block' }}
                      />
                      <span className="ml-2 opacity-60">다 읽은 날</span>
                    </div>
                    <div className="text-base">
                      미정
                      <GoChevronRight style={{ display: 'inline-block' }} />
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
          <div className="fixed bottom-0 z-30 h-1/2 w-full">
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
          <div className="fixed bottom-0 z-30 h-1/2 w-full">
            <DateSelector initialDate={endDate} setDate={setEndDate} type="종료" setIsChangeDate={setIsChangeEndDate} />
          </div>
        </HalfScreenModal>
      )}
    </>
  );
};

export default EditReadingDateModal;
