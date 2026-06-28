import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';

import { ClearAllConfirmModal } from './ClearAllConfirmModal';
import { RecentSearchChip } from './RecentSearchChip';
import { Title } from '../shared/Title';
import { useRecentSearchStore } from '../useRecentSearchStore';

const MSG_SEARCH_RECENT = '최근 검색어';
const MSG_SEARCH_RECENT_CLEAR_ALL = '전체 삭제';
const LAYER_ID_RECENT_SEARCH_CLEAR_ALL = 'recent-search-clear-all-modal';

export const RecentSearchSection = () => {
  const navigate = useNavigate();
  const { push } = useLayerStore();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearchStore();

  const handleSearchClick = (keyword: string) => {
    addRecentSearch(keyword);
    navigate(`/search/result?q=${encodeURIComponent(keyword)}`);
  };

  const handleClearAll = () => {
    if (recentSearches.length === 0) return;

    push({
      id: LAYER_ID_RECENT_SEARCH_CLEAR_ALL,
      component: <ClearAllConfirmModal onConfirm={clearRecentSearches} />,
    });
  };

  return (
    <section className="w-full">
      <Title
        text={MSG_SEARCH_RECENT}
        rightAction={
          <TextButton onClick={handleClearAll} text={MSG_SEARCH_RECENT_CLEAR_ALL} size="sm" variant="default" />
        }
      />

      <div className="w-full overflow-hidden">
        <ul className="scrollbar-hide flex w-full gap-2 overflow-x-auto px-mobile pb-4">
          {recentSearches.map((recentSearch) => (
            <li key={recentSearch} className="shrink-0">
              <RecentSearchChip
                keyword={recentSearch}
                onClick={() => handleSearchClick(recentSearch)}
                onRemove={() => removeRecentSearch(recentSearch)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
