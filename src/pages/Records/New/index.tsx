import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Header } from 'components/Header';

import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import { GROUP_ITEMS } from '../shared/mock';
import { getAddRecordStatus } from '../shared/recordStatus';

const MSG_ADD_RECORD_SUBMIT = '입력을 끝내고 완료하기';
const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
export const NewRecord = () => {
  const [searchParams] = useSearchParams();
  const [rating, setRating] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([GROUP_ITEMS[0], GROUP_ITEMS[1]]);

  const navigate = useNavigate();
  const { push, pop } = useLayerStore();

  const status = getAddRecordStatus(searchParams.get('status'));
  const handleSubmit = () => navigate('/records/new/completed');

  const handleToggleGroup = (group: string) => () => {
    setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]));
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
      component: <PageInfoModal onClose={pop} />,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header withBack />

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-mobile pb-64 pt-safe-top">
        <RatingSection rating={rating} onChange={setRating} />
        <ReadingPeriodSection onOpenStartDate={handleOpenStartDate} onOpenEndDate={handleOpenEndDate} />
        <ReadingProgressSection status={status} onOpenPageInfo={handleOpenPageInfo} />
        <GroupSection
          selectedGroups={selectedGroups}
          onOpenGroupEdit={handleOpenGroupEdit}
          onToggleGroup={handleToggleGroup}
        />
        <VisibilitySection onClick={() => {}} />
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
