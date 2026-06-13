import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';
import { SectionToggle } from '../shared/SectionToggle';

const MSG_CONTENT_TITLE = '콘텐츠 설정하기';
const MSG_CONTENT_ENV_SECTION = '콘텐츠 환경 설정';
const MSG_CONTENT_BLOCK_SECTION = '차단 관리';
const MSG_CONTENT_ADULT = '성인용 콘텐츠 가리기';
const MSG_CONTENT_RECOMMEND = '나를 위한 콘텐츠 추천받기';
const MSG_CONTENT_BLOCKED_USERS = '차단한 유저 확인하기';

const Content = () => {
  const navigate = useNavigate();
  const [isAdultContentHidden, setIsAdultContentHidden] = useState<boolean>(true);
  const [isPersonalRecommendationEnabled, setIsPersonalRecommendationEnabled] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_CONTENT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <SectionHeader title={MSG_CONTENT_ENV_SECTION} />
        <div className="flex flex-col gap-2 pb-10 pt-2">
          <SectionToggle
            label={MSG_CONTENT_ADULT}
            checked={isAdultContentHidden}
            onChange={() => setIsAdultContentHidden((prev) => !prev)}
          />
          <SectionToggle
            label={MSG_CONTENT_RECOMMEND}
            checked={isPersonalRecommendationEnabled}
            onChange={() => setIsPersonalRecommendationEnabled((prev) => !prev)}
          />
        </div>

        <SectionHeader title={MSG_CONTENT_BLOCK_SECTION} />
        <div className="pt-2">
          <SectionLink label={MSG_CONTENT_BLOCKED_USERS} onClick={() => navigate('/mypage/content/blocked-users')} />
        </div>
      </div>
    </div>
  );
};

export default Content;
