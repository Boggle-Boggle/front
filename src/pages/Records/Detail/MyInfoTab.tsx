import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import type { ReadingLogProgressType } from 'types';

import type { ReadingLogInfo } from './api';
import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import { BOOKSHELVES_QUERY_KEY, getBookshelves, type BookshelfItem } from '../shared/api';

const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
const DEFAULT_TOTAL_PAGE_COUNT = '120';

export interface MyInfoTabProps {
  readingLog: ReadingLogInfo;
}

export const MyInfoTab = ({ readingLog }: MyInfoTabProps) => {
  const [rating, setRating] = useState<number>(readingLog.rating);
  const [selectedBookshelfIds, setSelectedBookshelfIds] = useState<number[]>(() =>
    readingLog.bookshelves.map((b) => b.id),
  );

  // API 날짜 형식 (예: 2026-05-01T00:00:00.000+00:00)에서 YYYY-MM-DD 만 추출하여 사용합니다.
  const [startDate, setStartDate] = useState<string>(() => {
    return readingLog.startDate ? readingLog.startDate.split('T')[0] : '';
  });
  const [endDate, setEndDate] = useState<string>(() => {
    return readingLog.endDate ? readingLog.endDate.split('T')[0] : '';
  });

  const [progressType, setProgressType] = useState<ReadingLogProgressType>(readingLog.progress?.type || 'PAGE');
  const [progressValue, setProgressValue] = useState<string>(
    readingLog.progress ? String(readingLog.progress.value) : '',
  );
  const [totalPageCount, setTotalPageCount] = useState<string>(
    readingLog.progress ? String(readingLog.progress.totalPages) : DEFAULT_TOTAL_PAGE_COUNT,
  );
  const [isPrivate, setIsPrivate] = useState<boolean>(readingLog.isHidden);

  const { push, pop } = useLayerStore();
  const { data: bookshelves = [] } = useQuery({
    queryKey: BOOKSHELVES_QUERY_KEY,
    queryFn: getBookshelves,
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

  return (
    <div className="flex flex-col gap-8 pb-safe-bottom pt-[1.875rem]">
      <RatingSection rating={rating} onChange={setRating} />
      <ReadingPeriodSection
        startDate={startDate}
        endDate={endDate}
        onOpenStartDate={handleOpenStartDate}
        onOpenEndDate={handleOpenEndDate}
      />
      <ReadingProgressSection
        progressType={progressType}
        progressValue={progressValue}
        totalPageCount={totalPageCount}
        onChangeProgressType={setProgressType}
        onChangeProgressValue={setProgressValue}
        onOpenPageInfo={handleOpenPageInfo}
      />
      <GroupSection
        bookshelves={bookshelves}
        selectedBookshelfIds={selectedBookshelfIds}
        onOpenGroupEdit={handleOpenGroupEdit}
        onToggleBookshelf={handleToggleBookshelf}
      />
      <VisibilitySection checked={isPrivate} onChange={handleTogglePrivate} />
    </div>
  );
};
export default MyInfoTab;
