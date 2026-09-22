import { TextButton } from 'components/Button';
import { Divider } from 'components/Divider';
import { SideBar } from 'components/Layer/SideBar';
import { Radio } from 'components/Radio';
import { IconCirclePlus } from 'components/icons';

import type { ReadingLogStatus } from 'types';

import type { BookshelfCountResponse } from '../api';

type FilterOption = {
  value: ReadingLogStatus;
  label: string;
  count?: number;
};

type FilterSidebarProps = {
  selectedFilter: ReadingLogStatus;
  filterOptions: FilterOption[];
  bookshelves: BookshelfCountResponse[];
  onApplyFilter: (filter: ReadingLogStatus, bookshelfId?: number) => void;
  selectedBookshelfId?: number;
  isLoadingBookshelves?: boolean;
};

const MSG_MYBOOKS_FILTER_TITLE = '보기 설정하기';
const MSG_MYBOOKS_FILTER_GROUP_VIEW = '그룹 책장 보기';
const MSG_MYBOOKS_FILTER_CREATE_GROUP = '새 그룹 만들기';
const NAME_MYBOOKS_FILTER_RADIO = 'mybooks-filter';

export const FilterSidebar = (props: FilterSidebarProps) => {
  const {
    selectedFilter,
    filterOptions,
    bookshelves,
    onApplyFilter,
    selectedBookshelfId,
    isLoadingBookshelves = false,
  } = props;

  const handleSelectFilter = (nextFilter: ReadingLogStatus) => () => {
    onApplyFilter(nextFilter);
  };

  const handleSelectBookshelf = (bookshelfId: number) => () => {
    const nextBookshelfId = selectedBookshelfId === bookshelfId ? undefined : bookshelfId;

    onApplyFilter('ALL', nextBookshelfId);
  };

  const handleCreateGroup = () => undefined;

  return (
    <SideBar>
      <div className="flex h-full min-h-0 flex-col overflow-hidden px-[26px] pb-[14px] pt-6">
        {/* 헤더 */}
        <div className="flex shrink-0 items-center justify-between pb-3">
          <p className="text-title2">{MSG_MYBOOKS_FILTER_TITLE}</p>
        </div>

        {/* 독서 상태 */}
        <div className="shrink-0">
          {filterOptions.map((option) => {
            const isChecked = !selectedBookshelfId && selectedFilter === option.value;
            const statusLabel = typeof option.count === 'number' ? `${option.label} (${option.count})` : option.label;

            return (
              <Radio
                key={option.value}
                id={`mybooks-filter-${option.value}`}
                name={NAME_MYBOOKS_FILTER_RADIO}
                checked={isChecked}
                onChange={handleSelectFilter(option.value)}
                variant="primary"
                className="py-3"
              >
                <span className="text-body1 text-neutral-80">{statusLabel}</span>
              </Radio>
            );
          })}
        </div>

        <Divider className="my-4 shrink-0 border-neutral-20" />

        {/* 그룹 보기 */}
        <p className="shrink-0 text-title3">{MSG_MYBOOKS_FILTER_GROUP_VIEW}</p>
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          {isLoadingBookshelves ? (
            <div className="py-3 text-body1 text-neutral-60">로딩 중...</div>
          ) : bookshelves.length > 0 ? (
            bookshelves.map((group) => {
              const isChecked = selectedBookshelfId === group.id;
              const groupLabel = `${group.name} (${group.count})`;

              return (
                <Radio
                  key={group.id}
                  id={`mybooks-filter-bookshelf-${group.id}`}
                  name={NAME_MYBOOKS_FILTER_RADIO}
                  checked={isChecked}
                  onChange={handleSelectBookshelf(group.id)}
                  variant="primary"
                  className="active:bg-neutral-10/50 rounded-lg py-4 pl-0 transition-all"
                >
                  <span className="text-body1 text-neutral-80">{groupLabel}</span>
                </Radio>
              );
            })
          ) : (
            <div className="py-3 text-body1 text-neutral-60">생성된 그룹책장이 없습니다.</div>
          )}

          <TextButton
            text={MSG_MYBOOKS_FILTER_CREATE_GROUP}
            leftIcon={IconCirclePlus}
            onClick={handleCreateGroup}
            className="justify-starts my-2 flex w-full rounded-lg bg-neutral-20 py-2 text-title3 text-neutral-60"
            size="lg"
          />
        </div>
      </div>
    </SideBar>
  );
};
