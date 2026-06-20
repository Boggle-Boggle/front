import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';
import Cancel from 'components/icons/Cancel';

import { ClearAllConfirmModal } from './ClearAllConfirmModal';
import { Title } from '../shared/Title';

const MSG_SEARCH_RECENT = '최근 검색어';
const MSG_SEARCH_RECENT_CLEAR_ALL = '전체 삭제';
const LAYER_ID_RECENT_SEARCH_CLEAR_ALL = 'recent-search-clear-all-modal';
const RECOMMEND_TAGS = ['IT와 기술', '언어 학습', '요리 및 식음료', '비즈니스 및 경영', '라이프 스타일'];

export const RecentSearchSection = () => {
  const navigate = useNavigate();
  const [recentTags, setRecentTags] = useState(RECOMMEND_TAGS);
  const { push } = useLayerStore();

  const handleTagClick = (tag: string) => navigate(`/search/result?q=${encodeURIComponent(tag)}`);
  const handleClearAll = () => {
    if (recentTags.length === 0) return;

    push({
      id: LAYER_ID_RECENT_SEARCH_CLEAR_ALL,
      component: <ClearAllConfirmModal onConfirm={() => setRecentTags([])} />,
    });
  };

  return (
    <section className="w-full">
      <Title
        text={MSG_SEARCH_RECENT}
        rightAction={<TextButton onClick={handleClearAll} text={MSG_SEARCH_RECENT_CLEAR_ALL} size="sm" variant="default" />}
      />

      <div className="w-full overflow-hidden">
        <ul className="scrollbar-hide flex w-full gap-2 overflow-x-auto px-mobile pb-4">
          {recentTags.map((tag) => (
            <li key={tag} className="shrink-0">
              <TextButton onClick={() => handleTagClick(tag)} variant="filled" rightIcon={Cancel} text={tag} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
