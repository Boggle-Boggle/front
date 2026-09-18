import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';
import Loading from 'pages/Loading';

import { updateUserSettings, getUserSettings } from './api';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';
import { SectionToggle } from '../shared/SectionToggle';

const MSG_CONTENT_TITLE = '콘텐츠 설정하기';
const MSG_CONTENT_ENV_SECTION = '콘텐츠 환경 설정';
const MSG_CONTENT_BLOCK_SECTION = '차단 관리';
const MSG_CONTENT_REVIEW_SECTION = '리뷰 관리';
const MSG_CONTENT_ADULT = '민감한 콘텐츠 가리기';
const MSG_CONTENT_RECOMMEND = '나를 위한 콘텐츠 추천받기';
const MSG_CONTENT_BLOCKED_USERS = '차단한 유저 확인하기';
const MSG_CONTENT_MY_REVIEWS = '내가 쓴 리뷰';

const Content = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userSettings, isLoading } = useQuery({
    queryKey: ['users', 'me', 'settings'],
    queryFn: getUserSettings,
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(['users', 'me', 'settings'], updatedSettings);
    },
  });

  if (isLoading || !userSettings) return <Loading />;

  const handleAdultContentChange = () => {
    updateSettings({
      hideAdultContent: !userSettings.hideAdultContent,
    });
  };

  const handleRecommendationChange = () => {
    updateSettings({
      recommendForMe: !userSettings.recommendForMe,
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_CONTENT_TITLE} withBack />

      <SectionHeader title={MSG_CONTENT_ENV_SECTION} />
      <div className="flex flex-col gap-2 pb-10">
        <SectionToggle
          label={MSG_CONTENT_ADULT}
          checked={userSettings.hideAdultContent}
          onChange={handleAdultContentChange}
        />
        <SectionToggle
          label={MSG_CONTENT_RECOMMEND}
          checked={userSettings.recommendForMe}
          onChange={handleRecommendationChange}
        />
      </div>

      <SectionHeader title={MSG_CONTENT_REVIEW_SECTION} />
      <SectionLink label={MSG_CONTENT_MY_REVIEWS} onClick={() => navigate('/mypage/content/reviews')} isLast />

      <SectionHeader title={MSG_CONTENT_BLOCK_SECTION} />
      <SectionLink label={MSG_CONTENT_BLOCKED_USERS} onClick={() => navigate('/mypage/content/blocked-users')} />
    </div>
  );
};

export default Content;
