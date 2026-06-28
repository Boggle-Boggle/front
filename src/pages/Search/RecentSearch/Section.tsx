import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import Cancel from 'components/icons/Cancel';

import { ClearAllConfirmModal } from './ClearAllConfirmModal';
import { Title } from '../shared/Title';
import { useRecentSearchStore } from '../useRecentSearchStore';

const MSG_SEARCH_RECENT = '최근 검색어';
const MSG_SEARCH_RECENT_CLEAR_ALL = '전체 삭제';
const MSG_SEARCH_RECENT_REMOVE = '최근 검색어 삭제';
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
            <li
              key={recentSearch}
              className="inline-flex shrink-0 items-center rounded-full border border-neutral-20 bg-neutral-0 pl-2"
            >
              <TextButton onClick={() => handleSearchClick(recentSearch)} variant="filled" text={recentSearch} />
              <IconButton
                label={MSG_SEARCH_RECENT_REMOVE}
                icon={Cancel}
                onClick={() => removeRecentSearch(recentSearch)}
                size="xs"
                className="mr-1"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
