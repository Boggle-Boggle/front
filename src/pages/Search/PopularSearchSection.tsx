import { Title } from './shared/Title';

const MSG_SEARCH_POPULAR = '인기 검색어';

const POPULAR_SEARCHES = [
  '1. 나는 왜 따뜻한 대화가 힘들까',
  '2. 침묵의 퍼레이드',
  '3. 용선생 추론독해 초등 국어 3단계',
  '4. 듀얼 브레인',
  '5. 중학교 내신 A등급을 위한 최고의 선택',
  '6. 행복은 언제나 당신의 편',
  '7. 이상한 무인 라면 가게',
  '8. 행동은 불안을 이긴다',
];

export const PopularSearchSection = () => {
  const leftColumn = POPULAR_SEARCHES.slice(0, 4);
  const rightColumn = POPULAR_SEARCHES.slice(4, 8);

  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_POPULAR} />
      <div className="flex w-full gap-3 px-mobile">
        <div className="flex flex-1 flex-col gap-4">
          {leftColumn.map((keyword) => (
            <p key={keyword} className="line-clamp-1 text-body1 text-neutral-80">
              {keyword}
            </p>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rightColumn.map((keyword) => (
            <p key={keyword} className="line-clamp-1 text-body1 text-neutral-80">
              {keyword}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
