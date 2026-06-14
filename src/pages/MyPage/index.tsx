import { useNavigate } from 'react-router-dom';

import { IconBook, IconGraduation, IconNote } from 'components/icons';

import profileImage from 'assets/img/profile.png';

import SettingListItem from './SettingListItem';
import StatItem from './shared/StatItem';

const MSG_MY_PAGE_PROFILE_IMAGE_ALT = '프로필 일러스트';
const MSG_MY_PAGE_NICKNAME = '닉네임 님';
const MSG_MY_PAGE_LOGIN_STATUS = '* 카카오톡으로 로그인 중';

type MyPageMenuItem = {
  title: string;
  description: string;
  path: string;
};

const MY_PAGE_STATS = [
  {
    icon: <IconGraduation className="size-icon-md" />,
    label: '총 읽은 책',
    value: '345권',
  },
  {
    icon: <IconBook className="size-icon-md" />,
    label: '올해 읽은 책',
    value: '3권',
  },
  {
    icon: <IconNote className="size-icon-md" />,
    label: '내 독서 노트',
    value: '2345장',
  },
] as const;

const MY_PAGE_MENU_ITEMS: MyPageMenuItem[] = [
  {
    title: '계정 설정하기',
    description: '프로필 관리, 로그인 관리, 기록 다운로드',
    path: '/mypage/account',
  },
  {
    title: '테마/폰트 변경하기',
    description: '모드 선택하기, 테마 색상 변경하기 | 폰트 변경하기',
    path: '/mypage/theme-font',
  },
  {
    title: '콘텐츠 설정하기',
    description: '차단 관리, 콘텐츠 환경 설정',
    path: '/mypage/content',
  },
  {
    title: '고객센터',
    description: '자주 묻는 질문, 문의하기, 의견/오류 알려주기',
    path: '/mypage/support',
  },
  {
    title: '앱 정보',
    description: '서비스 이용 약관, 개인정보 처리방침, 버전 정보',
    path: '/mypage/about',
  },
];

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto bg-neutral-0 pb-safe-bottom">
      <div className="relative h-[24.0625rem] overflow-hidden bg-neutral-0">
        {/* 동그라미 세알 */}
        <div className="absolute inset-0">
          <div className="opacity-76 absolute right-[-4.35rem] top-[-6.5625rem] h-[18.75rem] w-[18.75rem] rounded-full bg-[radial-gradient(circle_at_34%_38%,rgba(139,207,167,0.96)_0%,rgba(174,222,245,0.9)_100%)] blur-[1rem]" />
          <div className="absolute -left-[2.65rem] top-[7.6875rem] h-[11.275rem] w-[11.275rem] rounded-full bg-[radial-gradient(circle_at_42%_40%,rgba(139,207,167,0.92)_0%,rgba(174,222,245,0.82)_100%)] opacity-80 blur-[0.95rem]" />
          <div className="opacity-72 absolute left-[2.55rem] top-[14.625rem] h-[23.5rem] w-[23.5rem] rounded-full bg-[radial-gradient(circle_at_40%_36%,rgba(139,207,167,0.84)_0%,rgba(174,222,245,0.94)_72%)] blur-[0.95rem]" />
        </div>

        {/* 유리알 */}
        <div className="relative mx-6 mt-6 flex h-[19.3125rem] flex-col items-center justify-center overflow-hidden rounded-3xl bg-neutral-80/20 px-4 text-neutral-0 shadow-[inset_0.125rem_0.125rem_0.125rem_rgba(255,255,255,0.6)] backdrop-blur-[1.25rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_42%)]" />

          {/* 프로필 */}
          <div className="size-24 overflow-hidden rounded-full bg-neutral-0">
            <img src={profileImage} alt={MSG_MY_PAGE_PROFILE_IMAGE_ALT} className="size-full object-cover" />
          </div>

          {/* 정보 */}
          <h1 className="pt-[0.625rem] text-title1">{MSG_MY_PAGE_NICKNAME}</h1>
          <p className="pt-[0.125rem] text-caption1">{MSG_MY_PAGE_LOGIN_STATUS}</p>

          {/* 카드 */}
          <div className="grid w-full grid-cols-3 gap-2 pt-4">
            {MY_PAGE_STATS.map((stat) => (
              <StatItem key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>

      {MY_PAGE_MENU_ITEMS.map((item) => (
        <SettingListItem
          key={item.title}
          title={item.title}
          description={item.description}
          onClick={() => navigate(item.path)}
        />
      ))}
    </div>
  );
};

export default MyPage;
