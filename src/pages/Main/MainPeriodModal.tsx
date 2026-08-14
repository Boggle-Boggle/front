import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { ContentModal } from 'components/Layer/ContentModal';
import { Radio } from 'components/Radio';
import { WheelPicker, type PickerColumn } from 'components/WheelPicker';

import type { MainPeriodFilterType, Bookshelf } from './types';

type MainPeriodModalProps = {
  currentFilter: MainPeriodFilterType;
  currentBookshelfId: number | null;
  currentYear: number;
  currentMonth: number;
  onConfirm: (params: {
    filter: MainPeriodFilterType;
    bookshelfId: number | null;
    year: number;
    month: number;
  }) => void;
  bookshelves?: Bookshelf[];
};

const MSG_MAIN_FILTER_ALL_TITLE = '전체 보기';
const MSG_MAIN_FILTER_ALL_DESC = '완독한 책을 모두 볼 수 있어요';

const MSG_MAIN_FILTER_GROUP_TITLE = '그룹별로 보기';
const MSG_MAIN_FILTER_GROUP_DESC = '완독한 책을 그룹별로 볼 수 있어요';

const MSG_MAIN_FILTER_PERIOD_TITLE = '기간별로 보기';
const MSG_MAIN_FILTER_PERIOD_DESC = '완독한 책을 기간별로 볼 수 있어요';

const MSG_MAIN_FILTER_NO_GROUP = '생성된 그룹책장이 없습니다.';
const MSG_MAIN_FILTER_CONFIRM = '확인';

export const MainPeriodModal = (props: MainPeriodModalProps) => {
  const { currentFilter, currentBookshelfId, currentYear, currentMonth, onConfirm, bookshelves } = props;
  const { pop } = useLayerStore();
  const [selectedFilter, setSelectedFilter] = useState<MainPeriodFilterType>(currentFilter);
  const [selectedBookshelfId, setSelectedBookshelfId] = useState<number | null>(currentBookshelfId);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const handleConfirm = () => {
    onConfirm({
      filter: selectedFilter,
      bookshelfId: selectedFilter === 'GROUP' ? selectedBookshelfId : null,
      year: selectedYear,
      month: selectedMonth,
    });
    pop();
  };

  const currentYearNum = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const y = currentYearNum - 9 + i;
    return { value: y, label: `${y}년` };
  }).reverse();

  const months = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return { value: m, label: `${m}월` };
  });

  const pickerColumns: PickerColumn[] = [
    {
      key: 'year',
      items: years,
      value: selectedYear,
      onChange: (val) => setSelectedYear(val as number),
    },
    {
      key: 'month',
      items: months,
      value: selectedMonth,
      onChange: (val) => setSelectedMonth(val as number),
    },
  ];

  return (
    <ContentModal title="책장 보기 옵션" onClose={pop}>
      {/* 옵션 리스트 */}
      <div className="flex w-full flex-col gap-2 pb-7">
        {/* 전체 보기 */}
        <div className="flex flex-col">
          <Radio
            id="filter-all"
            name="filter-type"
            checked={selectedFilter === 'ALL'}
            onChange={() => setSelectedFilter('ALL')}
          >
            <div className="flex flex-col gap-[2px]">
              <p className="text-title4 text-neutral-80">{MSG_MAIN_FILTER_ALL_TITLE}</p>
              <p className="text-caption1 text-neutral-60">{MSG_MAIN_FILTER_ALL_DESC}</p>
            </div>
          </Radio>
        </div>

        {/* 그룹별로 보기 */}
        <div className="flex flex-col">
          <Radio
            id="filter-group"
            name="filter-type"
            checked={selectedFilter === 'GROUP'}
            onChange={() => setSelectedFilter('GROUP')}
          >
            <div className="flex flex-col gap-[2px]">
              <p className="text-title4 text-neutral-80">{MSG_MAIN_FILTER_GROUP_TITLE}</p>
              <p className="text-caption1 text-neutral-60">{MSG_MAIN_FILTER_GROUP_DESC}</p>
            </div>
          </Radio>

          {/* 하위 그룹 목록 스크롤 영역 */}
          {selectedFilter === 'GROUP' && (
            <div className="mt-2 flex max-h-[160px] flex-col gap-1 overflow-y-auto px-1">
              {bookshelves && bookshelves.length > 0 ? (
                bookshelves.map((group) => {
                  const isGroupSelected = selectedBookshelfId === group.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setSelectedBookshelfId(group.id)}
                      className={`h-[42px] w-full items-center justify-center rounded-lg border-[1.5px] text-title4 transition-colors ${
                        isGroupSelected ? 'border-primary text-primary' : 'border-neutral-20 text-neutral-40'
                      }`}
                    >
                      {group.name}
                    </button>
                  );
                })
              ) : (
                <p className="py-2 text-body2 text-neutral-60">{MSG_MAIN_FILTER_NO_GROUP}</p>
              )}
            </div>
          )}
        </div>

        {/* 기간별로 보기 */}
        <div className="flex flex-col">
          <Radio
            id="filter-period"
            name="filter-type"
            checked={selectedFilter === 'PERIOD'}
            onChange={() => setSelectedFilter('PERIOD')}
          >
            <div className="flex flex-col gap-[2px]">
              <p className="text-title4 text-neutral-80">{MSG_MAIN_FILTER_PERIOD_TITLE}</p>
              <p className="text-caption1 text-neutral-60">{MSG_MAIN_FILTER_PERIOD_DESC}</p>
            </div>
          </Radio>

          {/* 하위 기간 선택 WheelPicker 영역 */}
          {selectedFilter === 'PERIOD' && (
            <div className="mt-4 flex w-full justify-center py-2">
              <WheelPicker columns={pickerColumns} />
            </div>
          )}
        </div>
      </div>

      {/* 확인 버튼 */}
      <Button onClick={handleConfirm} size="medium" variant="primary" className="w-full">
        {MSG_MAIN_FILTER_CONFIRM}
      </Button>
    </ContentModal>
  );
};
