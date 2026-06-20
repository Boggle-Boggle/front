import { useState } from 'react';

import { Tabs, type TabItem } from 'components/Tabs';

import { BookInfoTab } from './BookInfoTab';
import { MyInfoTab } from './MyInfoTab';
import { NoteTab } from './NoteTab';
import { RecordDetailHero } from './RecordDetailHero';

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
  const [activeTab, setActiveTab] = useState<DetailTabType>('info');

  return (
    <div className="h-full overflow-y-auto pb-safe-bottom">
      <RecordDetailHero
        cover="https://image.aladin.co.kr/product/36466/21/cover500/k572039816_1.jpg"
        title="리얼파리"
        author="황보경"
      />

      <div className="px-mobile">
        <Tabs tabs={RECORD_DETAIL_TABS} value={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'info' && <BookInfoTab />}
        {activeTab === 'note' && <NoteTab />}
        {activeTab === 'myInfo' && <MyInfoTab />}
      </div>
    </div>
  );
};

export default RecordDetailPage;
