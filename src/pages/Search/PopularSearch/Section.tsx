import { Link } from 'react-router-dom';

import { PopularSearchSkeleton } from './PopularSearchSkeleton';
import { usePopularKeywordsQuery } from './queries/usePopularKeywordsQuery';
import { Title } from '../shared/Title';

const MSG_SEARCH_POPULAR = '인기 검색어';

export const PopularSearchSection = () => {
  const { data: popularKeywords, isLoading } = usePopularKeywordsQuery();

  if (isLoading) return <PopularSearchSkeleton />;
  if (!popularKeywords || popularKeywords.length === 0) return null;

  const leftColumn = popularKeywords.slice(0, 5);
  const rightColumn = popularKeywords.slice(5, 10);

  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_POPULAR} />
      <div className="flex w-full gap-3 px-mobile">
        <div className="flex flex-1 flex-col gap-4">
          {leftColumn.map(({ rank, keyword }) => (
            <Link
              key={rank}
              to={`/search/result?q=${encodeURIComponent(keyword)}`}
              className="line-clamp-1 text-left text-body1 text-neutral-80"
            >
              {rank}. {keyword}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rightColumn.map(({ rank, keyword }) => (
            <Link
              key={rank}
              to={`/search/result?q=${encodeURIComponent(keyword)}`}
              className="line-clamp-1 text-left text-body1 text-neutral-80"
            >
              {rank}. {keyword}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
