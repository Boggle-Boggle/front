import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection, type ReadingProgressType } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import { GROUP_ITEMS } from '../shared/mock';

const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
const DEFAULT_TOTAL_PAGE_COUNT = '120';

export const MyInfoTab = () => {
  const [rating, setRating] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([GROUP_ITEMS[0], GROUP_ITEMS[1]]);
  const [progressType, setProgressType] = useState<ReadingProgressType>('PAGE');
  const [progressValue, setProgressValue] = useState<string>('');
  const [totalPageCount, setTotalPageCount] = useState<string>(DEFAULT_TOTAL_PAGE_COUNT);
  const { push, pop } = useLayerStore();

  const handleToggleGroup = (group: string) => () => {
    setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]));
  };

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-detail-start-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_START} onClose={pop} />,
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-detail-end-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_END} onClose={pop} />,
    });
  };

  const handleOpenDeleteGroupModal = () => {
    push({
      id: 'book-record-detail-group-delete-modal',
      component: <GroupDeleteConfirmModal onClose={pop} />,
    });
  };

  const handleOpenGroupEdit = () => {
    push({
      id: 'book-record-detail-group-edit-modal',
      component: <GroupEditModal onClose={pop} onDeleteGroup={handleOpenDeleteGroupModal} />,
    });
  };

  const handleOpenPageInfo = () => {
    push({
      id: 'book-record-detail-page-info-modal',
      component: <PageInfoModal initialValue={totalPageCount} onClose={pop} onSubmit={setTotalPageCount} />,
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-safe-bottom pt-[1.875rem]">
      <RatingSection rating={rating} onChange={setRating} />
      <ReadingPeriodSection onOpenStartDate={handleOpenStartDate} onOpenEndDate={handleOpenEndDate} />
      <ReadingProgressSection
        progressType={progressType}
        progressValue={progressValue}
        totalPageCount={totalPageCount}
        onChangeProgressType={setProgressType}
        onChangeProgressValue={setProgressValue}
        onOpenPageInfo={handleOpenPageInfo}
      />
      <GroupSection
        selectedGroups={selectedGroups}
        onOpenGroupEdit={handleOpenGroupEdit}
        onToggleGroup={handleToggleGroup}
      />
      <VisibilitySection onClick={() => {}} />
    </div>
  );
};
