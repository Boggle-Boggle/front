import { TextButton } from 'components/Button';

import { Title } from '../../../shared/Title';

const RECENT_SEARCH_SKELETON_ITEMS = Array.from({ length: 5 }, (_, index) => `recent-search-skeleton-${index}`);
const MSG_SEARCH_RECENT = '최근 검색어';
const MSG_SEARCH_RECENT_CLEAR_ALL = '전체 삭제';
const noop = () => {};

export const RecentSearchSkeleton = () => {
  return (
    <section className="w-full">
      <Title
        text={MSG_SEARCH_RECENT}
        rightAction={
          <TextButton onClick={noop} text={MSG_SEARCH_RECENT_CLEAR_ALL} size="sm" variant="default" disabled />
        }
      />

      <div className="w-full overflow-hidden pb-8">
        <ul className="scrollbar-hide flex w-full snap-x snap-mandatory scroll-px-mobile gap-2 overflow-x-auto scroll-smooth px-mobile">
          {RECENT_SEARCH_SKELETON_ITEMS.map((item) => (
            <li key={item} className="shrink-0 snap-start">
              <div className="skeleton h-9 w-20 rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
