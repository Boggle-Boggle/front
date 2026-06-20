import { useState } from 'react';

import { Button, TextButton } from 'components/Button';
import { Divider } from 'components/Divider';
import { SideBar } from 'components/Layer/SideBar';
import { Radio } from 'components/Radio';
import { IconArrowRight, IconCirclePlus } from 'components/icons';

import { type ReadingFilterType } from '../useLibraryQuery';

type FilterOption = {
  value: ReadingFilterType;
  label: string;
  count?: number;
};

type FilterSidebarProps = {
  selectedFilter: ReadingFilterType;
  filterOptions: FilterOption[];
  onApplyFilter: (filter: ReadingFilterType) => void;
};

const MSG_MYBOOKS_FILTER_TITLE = '보기 설정하기';
const MSG_MYBOOKS_FILTER_COMPLETE = '완료';
const MSG_MYBOOKS_FILTER_GROUP_VIEW = '그룹 보기';
const MSG_MYBOOKS_FILTER_CREATE_GROUP = '새 그룹 만들기';
const MSG_MYBOOKS_FILTER_PERIOD_VIEW = '기간 선택 보기';

const GROUP_ITEMS = [
  { id: 'group-01', label: '내가 만든 그룹 01', count: 0 },
  { id: 'group-02', label: '내가 만든 그룹 02', count: 0 },
  { id: 'group-03', label: '내가 만든 그룹 03', count: 0 },
  { id: 'group-04', label: '내가 만든 그룹 04', count: 0 },
];

const PERIOD_ITEMS = [
  { id: 'period-2025', label: '2025년 책 모음', count: 662 },
  { id: 'period-2024', label: '2024년 책 모음', count: 746 },
  { id: 'period-2023', label: '2023년 책 모음', count: 305 },
  { id: 'period-2022', label: '2022년 책 모음', count: 677 },
];

export const FilterSidebar = (props: FilterSidebarProps) => {
  const { selectedFilter, filterOptions, onApplyFilter } = props;

  const [draftFilter, setDraftFilter] = useState<ReadingFilterType>(selectedFilter);

  const handleApplyFilter = () => {
    onApplyFilter(draftFilter);
  };

  const handleSelectFilter = (nextFilter: ReadingFilterType) => () => {
    setDraftFilter(nextFilter);
  };

  const handleCreateGroup = () => undefined;

  return (
    <SideBar>
      <div className="flex flex-col justify-between px-[26px] pb-[14px] pt-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between pb-3">
          <p className="text-title2">{MSG_MYBOOKS_FILTER_TITLE}</p>
          <Button variant="primary" size="small" width="short" onClick={handleApplyFilter}>
            {MSG_MYBOOKS_FILTER_COMPLETE}
          </Button>
        </div>

        {/* 독서 상태 */}
        <div className="flex-1 overflow-y-auto">
          {filterOptions.map((option) => {
            const isChecked = draftFilter === option.value;
            const statusLabel = typeof option.count === 'number' ? `${option.label} (${option.count})` : option.label;

            return (
              <button
                key={option.value}
                type="button"
                className="flex w-full items-center justify-between py-3 text-body1 text-neutral-80"
                onClick={handleSelectFilter(option.value)}
              >
                {statusLabel}
                <Radio
                  id={`mybooks-filter-${option.value}`}
                  name="mybooks-filter"
                  checked={isChecked}
                  onChange={handleSelectFilter(option.value)}
                  variant="primary"
                />
              </button>
            );
          })}

          <Divider className="my-4 border-neutral-20" />

          {/* 그룹 보기 */}
          <p className="text-title3">{MSG_MYBOOKS_FILTER_GROUP_VIEW}</p>
          <div className="mt-2">
            {GROUP_ITEMS.map((group) => {
              const groupLabel = `${group.label} (${group.count})`;

              return (
                <div key={group.id} className="py-3 text-body1 text-neutral-100">
                  {groupLabel}
                </div>
              );
            })}
          </div>

          <TextButton
            text={MSG_MYBOOKS_FILTER_CREATE_GROUP}
            leftIcon={IconCirclePlus}
            onClick={handleCreateGroup}
            className="justify-starts my-2 flex w-full rounded-lg bg-neutral-20 py-2 text-title3 text-neutral-60"
            size="lg"
          />

          <Divider className="my-4 border-neutral-20" />

          {/* 기간 보기 */}
          <p className="text-title3">{MSG_MYBOOKS_FILTER_PERIOD_VIEW}</p>
          <div className="mt-1">
            {PERIOD_ITEMS.map((period) => {
              const periodLabel = `${period.label} (${period.count})`;

              return (
                <button key={period.id} type="button" className="flex w-full items-center py-3 text-left text-neutral-80">
                  <IconArrowRight className="mr-2 size-icon-sm" />
                  <span className="text-title3">{periodLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SideBar>
  );
};
