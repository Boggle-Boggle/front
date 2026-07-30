import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { Button, TextButton } from 'components/Button';
import { Divider } from 'components/Divider';
import { SideBar } from 'components/Layer/SideBar';
import { Radio } from 'components/Radio';
import { IconCirclePlus } from 'components/icons';

import type { ReadingLogStatus } from 'types';

import { getBookshelves } from '../api';

type FilterOption = {
  value: ReadingLogStatus;
  label: string;
  count?: number;
};

type FilterSidebarProps = {
  selectedFilter: ReadingLogStatus;
  filterOptions: FilterOption[];
  onApplyFilter: (filter: ReadingLogStatus, bookshelfId?: number) => void;
  selectedBookshelfId?: number;
};

const MSG_MYBOOKS_FILTER_TITLE = '보기 설정하기';
const MSG_MYBOOKS_FILTER_COMPLETE = '완료';
const MSG_MYBOOKS_FILTER_GROUP_VIEW = '그룹 보기';
const MSG_MYBOOKS_FILTER_CREATE_GROUP = '새 그룹 만들기';

export const FilterSidebar = (props: FilterSidebarProps) => {
  const { selectedFilter, filterOptions, onApplyFilter, selectedBookshelfId } = props;

  const [draftFilter, setDraftFilter] = useState<ReadingLogStatus>(selectedFilter);
  const [draftBookshelfId, setDraftBookshelfId] = useState<number | undefined>(selectedBookshelfId);

  const { data: bookshelvesData, isLoading: isBookshelvesLoading } = useQuery({
    queryKey: ['bookshelves'],
    queryFn: getBookshelves,
  });

  const handleApplyFilter = () => {
    onApplyFilter(draftFilter, draftBookshelfId);
  };

  const handleSelectFilter = (nextFilter: ReadingLogStatus) => () => {
    setDraftFilter(nextFilter);
  };

  const handleSelectBookshelf = (bookshelfId: number) => () => {
    setDraftBookshelfId((prev) => (prev === bookshelfId ? undefined : bookshelfId));
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
          <div className="mt-2 min-h-[4rem]">
            {isBookshelvesLoading ? (
              <div className="py-3 text-body1 text-neutral-60">로딩 중...</div>
            ) : bookshelvesData && bookshelvesData.length > 0 ? (
              bookshelvesData.map((group) => {
                const isChecked = draftBookshelfId === group.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    className="active:bg-neutral-10/50 flex w-full items-center justify-between rounded-lg py-4 pl-0 pr-2 text-body1 text-neutral-80 outline-none transition-all"
                    onClick={handleSelectBookshelf(group.id)}
                  >
                    <span className="text-body1 text-neutral-80">{group.name}</span>
                    <Radio
                      id={`mybooks-filter-bookshelf-${group.id}`}
                      name="mybooks-filter-bookshelf"
                      checked={isChecked}
                      onChange={() => {}}
                      variant="primary"
                      className="pointer-events-none"
                    />
                  </button>
                );
              })
            ) : (
              <div className="py-3 text-body1 text-neutral-60">생성된 그룹책장이 없습니다.</div>
            )}
          </div>

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
