import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { TextButton } from 'components/Button';

import { ClearAllConfirmModal } from './ClearAllConfirmModal';
import { RecentSearchChip } from './RecentSearchChip';
import { useRecentSearchesQuery } from './queries/useRecentSearchesQuery';
import { useRemoveRecentSearchMutation } from './queries/useRemoveRecentSearchMutation';
import { Title } from '../shared/Title';

const MSG_SEARCH_RECENT = '최근 검색어';
const MSG_SEARCH_RECENT_CLEAR_ALL = '전체 삭제';
const MSG_SEARCH_RECENT_EMPTY = '최근 검색어가 없어요.';
const LAYER_ID_RECENT_SEARCH_CLEAR_ALL = 'recent-search-clear-all-modal';

export const RecentSearchSection = () => {
  const navigate = useNavigate();
  const { push } = useLayerStore();
  const { data: recentSearches = [], isLoading: isRecentSearchesLoading } = useRecentSearchesQuery();
  const { isPending: isRemoveRecentSearchPending, mutate: removeRecentSearch } = useRemoveRecentSearchMutation();

  const handleSearchClick = (keyword: string) => {
    navigate(`/search/result?q=${encodeURIComponent(keyword)}`);
  };

  const handleClearAll = () => {
    if (recentSearches.length === 0) return;

    push({
      id: LAYER_ID_RECENT_SEARCH_CLEAR_ALL,
      component: <ClearAllConfirmModal keywords={recentSearches} />,
    });
  };

  const isClearDisabled = isRecentSearchesLoading || isRemoveRecentSearchPending || recentSearches.length === 0;

  return (
    <section className="w-full">
      <Title
        text={MSG_SEARCH_RECENT}
        rightAction={
          <TextButton
            onClick={handleClearAll}
            text={MSG_SEARCH_RECENT_CLEAR_ALL}
            size="sm"
            variant="default"
            disabled={isClearDisabled}
          />
        }
      />

      <div className="w-full overflow-hidden pb-8">
        {!isRecentSearchesLoading && recentSearches.length === 0 && (
          <p className="px-mobile text-left text-caption1 text-neutral-40">{MSG_SEARCH_RECENT_EMPTY}</p>
        )}

        {recentSearches.length > 0 && (
          <ul className="scrollbar-hide flex w-full snap-x snap-mandatory scroll-px-mobile gap-2 overflow-x-auto scroll-smooth px-mobile">
            {recentSearches.map((recentSearch) => (
              <li key={recentSearch} className="shrink-0 snap-start">
                <RecentSearchChip
                  keyword={recentSearch}
                  onClick={() => handleSearchClick(recentSearch)}
                  onRemove={() => removeRecentSearch(recentSearch)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
