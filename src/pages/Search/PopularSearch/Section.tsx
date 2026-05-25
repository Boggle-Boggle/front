import { Link } from 'react-router-dom';

import { Title } from '../shared/Title';

const MSG_SEARCH_POPULAR = '인기 검색어';

const POPULAR_SEARCHES = [
  { detailId: '9788959897092', label: '1. 나는 왜 따뜻한 대화가 힘들까' },
  { detailId: '9788925564720', label: '2. 침묵의 퍼레이드' },
  { detailId: '9791164068928', label: '3. 용선생 추론독해 초등 국어 3단계' },
  { detailId: '9788932924494', label: '4. 듀얼 브레인' },
  { detailId: '9791162435821', label: '5. 중학교 내신 A등급을 위한 최고의 선택' },
  { detailId: '9791191114766', label: '6. 행복은 언제나 당신의 편' },
  { detailId: '9791170611569', label: '7. 이상한 무인 라면 가게' },
  { detailId: '9791194033354', label: '8. 행동은 불안을 이긴다' },
];

export const PopularSearchSection = () => {
  const leftColumn = POPULAR_SEARCHES.slice(0, 4);
  const rightColumn = POPULAR_SEARCHES.slice(4, 8);

  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_POPULAR} />
      <div className="flex w-full gap-3 px-mobile">
        <div className="flex flex-1 flex-col gap-4">
          {leftColumn.map(({ detailId, label }) => (
            <Link
              key={detailId}
              to={`/detail/${detailId}`}
              className="line-clamp-1 text-left text-body1 text-neutral-80"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rightColumn.map(({ detailId, label }) => (
            <Link
              key={detailId}
              to={`/detail/${detailId}`}
              className="line-clamp-1 text-left text-body1 text-neutral-80"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
