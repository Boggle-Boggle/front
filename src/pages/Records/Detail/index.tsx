import { useQuery } from '@tanstack/react-query';

import { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Tabs, type TabItem } from 'components/Tabs';
import Loading from 'pages/Loading';

import { READING_STATUS_LABEL_BY_CODE } from 'types';

import { BookInfoTab } from './BookInfoTab';
import { MyInfoTab } from './MyInfoTab';
import { NoteTab } from './NoteTab';
import { RecordDetailHero } from './RecordDetailHero';
import { getReadingLogDetail } from './api';

type DetailTabType = 'info' | 'note' | 'myInfo';

const RECORD_DETAIL_TABS: TabItem<DetailTabType>[] = [
  {
    id: 'info',
    label: '책 정보',
  },
  {
    id: 'note',
    label: '독서노트',
  },
  {
    id: 'myInfo',
    label: '내 독서 정보',
  },
];

export const RecordDetailPage = () => {
  const { recordId = '' } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<DetailTabType>((location.state?.activeTab as DetailTabType) || 'info');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reading-log', recordId],
    queryFn: () => getReadingLogDetail(recordId),
    enabled: !!recordId,
  });

  if (isLoading) return <Loading />;

  if (isError || !data)
    return (
      <div className="flex h-full items-center justify-center text-body1 text-neutral-60">
        독서 기록 정보를 불러오는 데 실패했습니다.
      </div>
    );

  const readingStatusLabel = READING_STATUS_LABEL_BY_CODE[data.readingLog.status] || '읽는중';

  return (
    <div className="h-full overflow-y-auto pb-safe-bottom" ref={scrollContainerRef}>
      <RecordDetailHero
        scrollContainerRef={scrollContainerRef}
        cover={data.book.coverUrl}
        title={data.book.title}
        author={data.book.author}
        rating={String(data.readingLog.rating)}
        readingStatus={readingStatusLabel}
        noteCount={`${data.readingLog.noteCount}개`}
      />

      <div className="px-mobile">
        <Tabs tabs={RECORD_DETAIL_TABS} value={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'info' && <BookInfoTab book={data.book} />}
        {activeTab === 'note' && <NoteTab readingLogId={recordId} />}
        {activeTab === 'myInfo' && <MyInfoTab readingLog={data.readingLog} />}
      </div>
    </div>
  );
};

export default RecordDetailPage;
