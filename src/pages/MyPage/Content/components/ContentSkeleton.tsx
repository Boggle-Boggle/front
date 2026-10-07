import { Header } from 'components/Header';

import { SectionHeader } from '../../shared/SectionHeader';
import { SectionLink } from '../../shared/SectionLink';

const MSG_CONTENT_TITLE = '콘텐츠 설정하기';
const MSG_CONTENT_ENV_SECTION = '콘텐츠 환경 설정';
const MSG_CONTENT_BLOCK_SECTION = '차단 관리';
const MSG_CONTENT_ADULT = '민감한 콘텐츠 가리기';
const MSG_CONTENT_BLOCKED_USERS = '차단한 유저 확인하기';

const noop = () => {};

export const ContentSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_CONTENT_TITLE} withBack />

      <SectionHeader title={MSG_CONTENT_ENV_SECTION} />
      <div className="flex flex-col gap-2 pb-10">
        <div className="flex h-12 items-center gap-2 px-mobile">
          <span className="flex-1 text-body1">{MSG_CONTENT_ADULT}</span>
          <div className="skeleton h-6 w-11 rounded-full" />
        </div>
      </div>

      <SectionHeader title={MSG_CONTENT_BLOCK_SECTION} />
      <SectionLink label={MSG_CONTENT_BLOCKED_USERS} onClick={noop} />
    </div>
  );
};
