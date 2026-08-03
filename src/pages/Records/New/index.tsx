import { useMutation, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { createCustomReadingLog } from 'pages/AddCustomBook/api';

import type { AddRecordStatus, BookDetail, CustomBookDto, ReadingLogProgressType } from 'types';

import { createReadingLog } from './api';
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
import { getAddRecordStatus } from '../shared/recordStatus';

const MSG_ADD_RECORD_SUBMIT = '입력을 끝내고 완료하기';
const MSG_ADD_RECORD_FAILED = '독서 기록을 저장하지 못했습니다. 다시 시도해주세요.';
const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';

export const NewRecord = () => {
  const [rating, setRating] = useState<number>(0);
  const [selectedBookshelfIds, setSelectedBookshelfIds] = useState<number[]>([]);
  const [progressType, setProgressType] = useState<ReadingLogProgressType>('PAGE');
  const [progressValue, setProgressValue] = useState<string>('');
  const [totalPageCountOverride, setTotalPageCountOverride] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { push, pop } = useLayerStore();
  const { addToast } = useToastStore();

  const customBook = location.state?.customBook as CustomBookDto | undefined;
  const customStatus = location.state?.status as AddRecordStatus | undefined;
  const bookDetail = location.state?.bookDetail as BookDetail | undefined;
  const status = customStatus || getAddRecordStatus(searchParams.get('status'));

  const { data: bookshelves = [] } = useQuery({ queryKey: BOOKSHELVES_QUERY_KEY, queryFn: getBookshelves });

  const { isPending: isCustomPending, mutate: saveCustomReadingLog } = useMutation({
    mutationFn: createCustomReadingLog,
    onSuccess: () => navigate('/records/new/completed'),
    onError: () => addToast({ description: MSG_ADD_RECORD_FAILED, type: 'error' }),
  });

  const { isPending, mutate: saveReadingLog } = useMutation({
    mutationFn: createReadingLog,
    onSuccess: () => navigate('/records/new/completed'),
    onError: () => addToast({ description: MSG_ADD_RECORD_FAILED, type: 'error' }),
  });

  const totalPageCount =
    totalPageCountOverride || customBook?.totalPages?.toString() || bookDetail?.totalPages?.toString() || '';

  const handleSubmit = () => {
    // 중복 요청 방지
    if (isCustomPending || isPending) return;

    if (customBook) {
      // [분기 A] 사용자가 직접 입력(수동)한 도서 정보를 짊어지고 진입한 경우
      saveCustomReadingLog({
        book: {
          ...customBook,
          totalPages: totalPageCount ? Number(totalPageCount) : undefined,
        },
        readingLog: {
          status,
          rating,
          startDate,
          endDate: status === 'COMPLETED' ? endDate : undefined,
          bookshelfIds: selectedBookshelfIds,
          isHidden,
          // 값이 기입되어 있을 때만 안전하게 인라인 변환 전송 (비어 있으면 undefined 로 가드해 전송 누락)
          progressType: progressValue ? progressType : undefined,
          progressValue: progressValue ? Number(progressValue) : undefined,
        },
        });

        return;
        }

        if (!bookDetail) return;

        // [분기 B] 일반 검색(알라딘) 연동 도서 정보로 진입하여 기록을 추가하는 경우
        saveReadingLog({
        isbn13: bookDetail.isbn13,
        mediaType: bookDetail.mediaType,
        status,
        rating,
        startDate,
        endDate,
        bookshelfIds: selectedBookshelfIds,
        isHidden,
        // 값이 기입되어 있을 때만 안전하게 인라인 변환 전송 (비어 있으면 undefined 로 가드해 전송 누락)
        progressType: progressValue ? progressType : undefined,
        progressValue: progressValue ? Number(progressValue) : undefined,
        totalPagesOverride: totalPageCountOverride ? Number(totalPageCountOverride) : undefined,
        });
  };

  const handleToggleBookshelf = (bookshelfId: number) =>
    setSelectedBookshelfIds((prev) =>
      prev.includes(bookshelfId) ? prev.filter((item) => item !== bookshelfId) : [...prev, bookshelfId],
    );

  const handleDeleteBookshelfSuccess = (bookshelfId: number) =>
    setSelectedBookshelfIds((prev) => prev.filter((item) => item !== bookshelfId));

  const handleTogglePrivate = () => setIsHidden((prev) => !prev);

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-start-date-modal',
      component: (
        <DateSelectModal title={MSG_DATE_SELECT_START} initialDate={startDate} onSubmit={setStartDate} onClose={pop} />
      ),
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-end-date-modal',
      component: (
        <DateSelectModal title={MSG_DATE_SELECT_END} initialDate={endDate} onSubmit={setEndDate} onClose={pop} />
      ),
    });
  };

  const handleOpenDeleteGroupModal = (bookshelf: BookshelfItem) => {
    push({
      id: 'book-record-group-delete-modal',
      component: (
        <GroupDeleteConfirmModal bookshelf={bookshelf} onClose={pop} onDeleted={handleDeleteBookshelfSuccess} />
      ),
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
      component: <PageInfoModal initialValue={totalPageCount} onClose={pop} onSubmit={setTotalPageCountOverride} />,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header withBack title={customBook ? customBook.title : bookDetail?.title} />

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-mobile pb-safe-bottom pt-safe-top">
        <RatingSection rating={rating} onChange={setRating} />
        <ReadingPeriodSection
          status={status}
          startDate={startDate}
          endDate={endDate}
          onOpenStartDate={handleOpenStartDate}
          onOpenEndDate={handleOpenEndDate}
        />
        {status !== 'COMPLETED' && (
          <ReadingProgressSection
            progressType={progressType}
            progressValue={progressValue}
            totalPageCount={totalPageCount}
            onChangeProgressType={setProgressType}
            onChangeProgressValue={setProgressValue}
            onOpenPageInfo={handleOpenPageInfo}
          />
        )}
        <GroupSection
          bookshelves={bookshelves}
          selectedBookshelfIds={selectedBookshelfIds}
          onOpenGroupEdit={handleOpenGroupEdit}
          onToggleBookshelf={handleToggleBookshelf}
        />
        <VisibilitySection checked={isHidden} onChange={handleTogglePrivate} />
      </div>

      <BottomButton
        onClick={handleSubmit}
        disabled={isPending || isCustomPending}
        loading={isPending || isCustomPending}
      >
        {MSG_ADD_RECORD_SUBMIT}
      </BottomButton>
    </div>
  );
};

export default NewRecord;
