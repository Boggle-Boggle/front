import { TextButton } from 'components/Button';
import Cancel from 'components/icons/Cancel';

import { Title } from '../shared/Title';

const MSG_SEARCH_RECENT = '최근 검색어';
const RECOMMEND_TAGS = ['IT와 기술', '언어 학습', '요리 및 식음료', '비즈니스 및 경영', '라이프 스타일'];

export const RecentSearchSection = () => {
  return (
    <section className="w-full">
      <Title text={MSG_SEARCH_RECENT} />

      <div className="w-full overflow-hidden">
        <ul className="scrollbar-hide flex w-full gap-2 overflow-x-auto px-mobile pb-4">
          {RECOMMEND_TAGS.map((tag) => (
            <li key={tag} className="shrink-0">
              <TextButton onClick={() => {}} icon={Cancel} iconPosition="right">
                {tag}
              </TextButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
