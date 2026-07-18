import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Header } from 'components/Header';

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

const MSG_ADD_RECORD_SUBMIT = '입력을 끝내고 완료하기';
const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
const DEFAULT_TOTAL_PAGE_COUNT = '120';

export const NewRecord = () => {
  const [rating, setRating] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([GROUP_ITEMS[0], GROUP_ITEMS[1]]);
  const [progressType, setProgressType] = useState<ReadingProgressType>('PAGE');
  const [progressValue, setProgressValue] = useState<string>('');
  const [totalPageCount, setTotalPageCount] = useState<string>(DEFAULT_TOTAL_PAGE_COUNT);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const navigate = useNavigate();
  const { push, pop } = useLayerStore();

  const handleSubmit = () => navigate('/records/new/completed');

  const handleToggleGroup = (group: string) => () => {
    setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]));
  };

  const handleTogglePrivate = () => {
    setIsPrivate((prev) => !prev);
  };

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-start-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_START} onClose={pop} />,
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-end-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_END} onClose={pop} />,
    });
  };

  const handleOpenDeleteGroupModal = () => {
    push({
      id: 'book-record-group-delete-modal',
      component: <GroupDeleteConfirmModal onClose={pop} />,
    });
  };

  const handleOpenGroupEdit = () => {
    push({
      id: 'book-record-group-edit-modal',
      component: <GroupEditModal onClose={pop} onDeleteGroup={handleOpenDeleteGroupModal} />,
    });
  };

  const handleOpenPageInfo = () => {
    push({
      id: 'book-record-page-info-modal',
      component: <PageInfoModal initialValue={totalPageCount} onClose={pop} onSubmit={setTotalPageCount} />,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header withBack />

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-mobile pb-64 pt-safe-top">
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
        <VisibilitySection checked={isPrivate} onChange={handleTogglePrivate} />
      </div>

      {/* TODO 바텀버튼 수정 필요 */}
      <div className="fixed inset-x-0 bottom-0 z-fixedBtn mx-auto flex h-[4.375rem] w-full max-w-mobile justify-end bg-neutral-0 px-mobile pb-safe-bottom pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="h-[3.375rem] w-[16.1875rem] rounded-xl border border-neutral-40 bg-primary text-body1 text-neutral-0"
        >
          {MSG_ADD_RECORD_SUBMIT}
        </button>
      </div>
    </div>
  );
};

export default NewRecord;
