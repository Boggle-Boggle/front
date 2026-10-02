import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { formatToDateInputValue, formatToReadingLogDateTime } from 'utils/date';

import type { ReadingLogProgressType } from 'types';

import type { UpdateReadingLogRequest, ReadingLogInfo } from './api';
import { useBookshelvesQuery } from './queries/useBookshelvesQuery';
import { useUpdateReadingLogMutation } from './queries/useUpdateReadingLogMutation';
import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { MyInfoHeader } from '../shared/MyInfoHeader';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import type { BookshelfItem } from '../shared/api';

const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
const DEFAULT_TOTAL_PAGE_COUNT = '120';

export interface MyInfoTabProps {
  readingLog: ReadingLogInfo;
}

const getInitialTotalPageCount = (readingLog: ReadingLogInfo) => {
  if (readingLog.totalPagesOverride) return String(readingLog.totalPagesOverride);
  if (readingLog.progress?.totalPages) return String(readingLog.progress.totalPages);

  return DEFAULT_TOTAL_PAGE_COUNT;
};

export const MyInfoTab = ({ readingLog }: MyInfoTabProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(readingLog.rating);
  const [selectedBookshelfIds, setSelectedBookshelfIds] = useState<number[]>(() =>
    readingLog.bookshelves.map((b) => b.id),
  );

  const [startDate, setStartDate] = useState<string>(() => formatToDateInputValue(readingLog.startDate));
  const [endDate, setEndDate] = useState<string>(() => formatToDateInputValue(readingLog.endDate));

  const [progressType, setProgressType] = useState<ReadingLogProgressType>(readingLog.progress?.type || 'PAGE');
  const [progressValue, setProgressValue] = useState<string>(
    readingLog.progress ? String(readingLog.progress.value) : '',
  );
  const [totalPageCount, setTotalPageCount] = useState<string>(() => getInitialTotalPageCount(readingLog));
  const [isPrivate, setIsPrivate] = useState<boolean>(readingLog.isHidden);

  const { recordId = '' } = useParams<{ recordId: string }>();
  const { push, pop } = useLayerStore();
  const { data: bookshelves = [] } = useBookshelvesQuery();
  const { mutate: updateRecord, isPending: isUpdateRecordPending } = useUpdateReadingLogMutation({
    recordId,
    onSuccess: () => setIsEdit(false),
  });

  const handleToggleBookshelf = (bookshelfId: number) => {
    setSelectedBookshelfIds((prev) =>
      prev.includes(bookshelfId) ? prev.filter((item) => item !== bookshelfId) : [...prev, bookshelfId],
    );
  };

  const handleDeleteBookshelfSuccess = (bookshelfId: number) => {
    setSelectedBookshelfIds((prev) => prev.filter((item) => item !== bookshelfId));
  };

  const handleTogglePrivate = () => {
    setIsPrivate((prev) => !prev);
  };

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-detail-start-date-modal',
      component: (
        <DateSelectModal title={MSG_DATE_SELECT_START} initialDate={startDate} onSubmit={setStartDate} onClose={pop} />
      ),
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-detail-end-date-modal',
      component: (
        <DateSelectModal title={MSG_DATE_SELECT_END} initialDate={endDate} onSubmit={setEndDate} onClose={pop} />
      ),
    });
  };

  const handleOpenDeleteGroupModal = (bookshelf: BookshelfItem) => {
    push({
      id: 'book-record-detail-group-delete-modal',
      component: (
        <GroupDeleteConfirmModal bookshelf={bookshelf} onClose={pop} onDeleted={handleDeleteBookshelfSuccess} />
      ),
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

  const handleToggleEdit = () => {
    if (isEdit) {
      const requestData: UpdateReadingLogRequest = {
        status: readingLog.status,
        rating,
        startDate: formatToReadingLogDateTime(startDate),
        endDate: endDate ? formatToReadingLogDateTime(endDate) : null,
        bookshelfIds: selectedBookshelfIds,
        isHidden: isPrivate,
      };

      if (progressValue !== '') {
        requestData.progressType = progressType;
        requestData.progressValue = Number(progressValue);
      }

      if (totalPageCount !== '') {
        requestData.totalPagesOverride = Number(totalPageCount);
      }

      updateRecord(requestData);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <>
      <MyInfoHeader isEdit={isEdit} disabled={isUpdateRecordPending} onToggleEdit={handleToggleEdit} />
      <div className="flex flex-col gap-9 pb-safe-bottom">
        <RatingSection rating={rating} onChange={setRating} isEdit={isEdit} />
        <ReadingPeriodSection
          startDate={startDate}
          endDate={endDate}
          onOpenStartDate={handleOpenStartDate}
          onOpenEndDate={handleOpenEndDate}
          isEdit={isEdit}
        />
        <ReadingProgressSection
          progressType={progressType}
          progressValue={progressValue}
          totalPageCount={totalPageCount}
          onChangeProgressType={setProgressType}
          onChangeProgressValue={setProgressValue}
          onOpenPageInfo={handleOpenPageInfo}
          isEdit={isEdit}
        />
        <GroupSection
          bookshelves={bookshelves}
          selectedBookshelfIds={selectedBookshelfIds}
          onOpenGroupEdit={handleOpenGroupEdit}
          onToggleBookshelf={handleToggleBookshelf}
          isEdit={isEdit}
        />
        <VisibilitySection checked={isPrivate} onChange={handleTogglePrivate} isEdit={isEdit} />
      </div>
    </>
  );
};
export default MyInfoTab;
